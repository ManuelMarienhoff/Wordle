import { useContext } from 'react'; /* needs to be imported in each file I want to use the global context */
import { AppContext } from '../App';

function Key({ keyVal, bigKey }) {
  const { board, setBoard, currentAttempt, setCurrentAttempt } =
    useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === 'ENTER') {
      if (currentAttempt.letterPosition !== 5)
        return; /* if not on last box of row, end function */
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPosition: 0 /* move to the next row down below */,
      });
    } else if (keyVal === 'DELETE') {
      if (currentAttempt.letterPosition === 0)
        return; /* can't delete if selected box is 0/empty, end function */
      const newBoard = [...board]; /* read the status of the board */
      newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] =
        ''; /* delete letter on previous keyBox  */
      setBoard(newBoard);
      setCurrentAttempt({
        ...currentAttempt,
        letterPosition: currentAttempt.letterPosition - 1,
      }); /* go back to deleted keyBox */
    } else {
      if (currentAttempt.letterPosition > 4)
        return; /* If selected keyBox is the last one of the row, end function */

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
    }
  };
  return (
    <div className="key" id={bigKey && 'big'} onClick={selectLetter}>
      {keyVal}
    </div>
  );
}

export default Key;
