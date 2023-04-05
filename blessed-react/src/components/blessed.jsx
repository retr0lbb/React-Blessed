import React, { useEffect, useRef } from 'react';
import term from 'term.js';
import blessed from 'blessed';

function MyBlessedComponent() {
  const termRef = useRef(null);

  useEffect(() => {
    // Create a Blessed screen object
    const screen = blessed.screen({
      smartCSR: true,
      title: 'My Blessed App',
      // Set other options here
    });

    // Add a Blessed element to the screen
    const box = blessed.box({
      top: 'center',
      left: 'center',
      width: '50%',
      height: '50%',
      content: 'Hello, world!',
      tags: true,
      border: {
        type: 'line',
      },
      style: {
        fg: 'white',
        bg: 'blue',
        border: {
          fg: '#f0f0f0',
        },
      },
    });

    screen.append(box);

    // Create a term.js terminal emulator and attach it to the DOM
    const termInstance = new term({
      cols: screen.width,
      rows: screen.height,
      cursorBlink: true,
      useStyle: true,
      screenKeys: true,
    });

    termInstance.open(termRef.current);
    termInstance.write(screen.render());

    // Clean up the screen object and terminal emulator when the component unmounts
    return () => {
      screen.destroy();
      termInstance.destroy();
    };
  }, []);

  return <div ref={termRef}></div>;
}

export default MyBlessedComponent;
