import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useEffect, useState } from 'react';
import { createContext } from 'react'; //allows me to create a global context for the app
import GameOver from './components/GameOver';
import wordBank from './wordleBank.txt';

export const AppContext = createContext();

function App() {
  /* build the empty board */
  const defaultBoard = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  /* ****************Board and currentAttempt******************** */
  const [board, setBoard] = useState(defaultBoard);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState('');

  /* Store words in a Set bc it's faster to read when trying to find if word exists/is correct */
  const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
      .then((response) => response.text())
      .then((result) => {
        /* make an array of the words that are separated by line breaks */
        const wordsArray = result.split('\n').map((word) => word.trim());
        todaysWord =
          wordsArray[
            Math.floor(Math.random() * wordsArray.length)
          ].toUpperCase(); /* get random element in the array */
        wordSet = new Set(wordsArray);
      });
    console.log(todaysWord);
    return { wordSet, todaysWord };
  };

  /* *********** Set Word of the day ************* */
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet); /* object returned in generateWordSet */
      setCorrectWord(words.todaysWord); /* set Correct Word of the Day */
    });
  }, []);

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

    let currentWord = '';
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    } /* store guessed word in currentWord */

    if (wordSet.has(currentWord.toLowerCase())) {
      /* check if word exists in wordSet */
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPosition: 0 /* move to the next row down below */,
      });
    } else {
      alert('word not found');
    }
    /* if user guesses word, game over and win */
    if (currentWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    /* if user gets past last attempt, game over and lose */
    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
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
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}>
        {/* everything inside this provider can access to the values*/}
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}{' '}
          {/* if game is over show message, else show keyboard */}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
