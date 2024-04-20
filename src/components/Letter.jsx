import { useContext } from 'react'; /* needs to be imported in each file I want to use the global context */
import { AppContext } from '../App';

function Letter({ letterPosition, attemptValue }) {
  const { board, correctWord, currentAttempt } = useContext(AppContext);
  const letter = board[attemptValue][letterPosition]; /* letter in keyBox */

  /* give colors to letters */
  const correct =
    correctWord[letterPosition] ===
    letter; /* if letter in Word == to letter in keyBox */
  const almost = !correct && letter !== '' && correctWord.includes(letter);

  const letterState =
    currentAttempt.attempt >
      attemptValue /* only show colors after we moved on to the next row */ &&
    (correct ? 'correct' : almost ? 'almost' : 'error');

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
