import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useState } from 'react';
import { defaultBoard } from './DefaultBoard';

import { createContext } from 'react'; //allows me to create a global context for the app
export const AppContext = createContext();

function App() {
  /* ****************Board and currentAttempt******************** */
  const [board, setBoard] = useState(defaultBoard);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });

  const correctWord = 'RIGHT';

  /* *******************************PRESS KEY FUNCTION************************** */
  const onSelectedLetter = (keyVal) => {
    if (currentAttempt.letterPosition > 4)
      return; /* can't add new letter if selected keyBox is the last one of the row, end function. */

    /* on click, insert letter in keyBox */
    const newBoard = [...board]; /* read the status of the board */
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] =
      keyVal; /* insert letter on selected keyBox */
    setBoard(newBoard);
    setCurrentAttempt({
      /* move onto the next keyBox after inserting the letter */
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition + 1,
    });
  };
  /* *************************DELETE KEY FUNCTION************************* */
  const onDelete = () => {
    if (currentAttempt.letterPosition === 0)
      return; /* can't delete if selected keyBox is first box / empty, end function */
    const newBoard = [...board]; /* read the status of the board */
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] =
      ''; /* delete letter on previous keyBox  */
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition - 1,
    }); /* go back to deleted keyBox */
  };
  /* ******************** ENTER KEY FUNCTION ********************************/
  const onEnter = () => {
    if (currentAttempt.letterPosition !== 5)
      return; /* if not on last box of row, end function */
    setCurrentAttempt({
      attempt: currentAttempt.attempt + 1,
      letterPosition: 0 /* move to the next row down below */,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider /* sharing values globaly with the app */
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onSelectedLetter,
          onDelete,
          onEnter,
          correctWord,
        }}>
        {/* everything inside this provider can access to the values*/}
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
