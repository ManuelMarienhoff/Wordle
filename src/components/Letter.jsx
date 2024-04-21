import {
  useContext,
  useEffect,
} from 'react'; /* needs to be imported in each file I want to use the global context */
import { AppContext } from '../App';

function Letter({ letterPosition, attemptValue }) {
  const {
    board,
    correctWord,
    currentAttempt,
    disabledLetters,
    setDisabledLetters,
  } = useContext(AppContext);
  const letter = board[attemptValue][letterPosition]; /* letter in keyBox */

  /* *********** coloring letters ***********/
  const correct =
    correctWord[letterPosition] ===
    letter; /* if letter in Word == to letter in keyBox */
  const almost = !correct && letter !== '' && correctWord.includes(letter);

  const letterState =
    currentAttempt.attempt >
      attemptValue /* only show colors after we moved on to the next row */ &&
    (correct ? 'correct' : almost ? 'almost' : 'error');

  /* ************Disable incorrect letters in Keyboard ********* */
  useEffect(() => {
    if (letter !== '' && !correct && !almost) {
      /* set disabledLetters to all the DL before + the new letter */
      setDisabledLetters((prevState) => [...prevState, letter]);
    }
  }, [
    currentAttempt.attempt /* run this useEffect every time we get a new attempt */,
  ]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
