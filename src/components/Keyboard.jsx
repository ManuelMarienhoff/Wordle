import { useCallback, useEffect, useContext } from 'react';
import Key from './Key';
import { AppContext } from '../App';

function Keyboard() {
  const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const { onSelectedLetter, onEnter, onDelete, disabledLetters } =
    useContext(AppContext); /* import global values from context */

  const handleKeyboard = useCallback((event) => {
    if (event.key === 'Enter') {
      onEnter();
    } else if (event.key === 'Backspace') {
      onDelete();
    } else {
      /* Use Arrays and forEach to prevent nonLetter keys to be added to the keyBoxes (alt,tab, etc)*/
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectedLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectedLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectedLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => {
      /* always remove eventListener */
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="keyRowContainer">
        <div className="line1">
          {keys1.map((key) => {
            return (
              <Key
                keyVal={key}
                key={key + 'key'}
                disabled={disabledLetters.includes(key)}
              />
            );
          })}
        </div>
        <div className="line2">
          {keys2.map((key) => {
            return (
              <Key
                keyVal={key}
                key={key + 'key'}
                disabled={disabledLetters.includes(key)}
              />
            );
          })}
        </div>
        <div className="line3">
          <Key keyVal={'ENTER'} key={'ENTER' + 'key'} bigKey />
          {keys3.map((key) => {
            return (
              <Key
                keyVal={key}
                key={key + 'key'}
                disabled={disabledLetters.includes(key)}
              />
            );
          })}
          <Key keyVal={'DELETE'} key={'DELETE' + 'key'} bigKey />
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
