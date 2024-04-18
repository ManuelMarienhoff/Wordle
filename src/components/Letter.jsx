import { useContext } from 'react'; /* needs to be imported in each file I want to use the global context */
import { AppContext } from '../App';

function Letter({ letterPosition, attemptValue }) {
  const { board } = useContext(AppContext);
  const letter = board[attemptValue][letterPosition];
  return <div className="letter">{letter}</div>;
}

export default Letter;
