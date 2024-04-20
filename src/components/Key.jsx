import { useContext } from 'react'; /* needs to be imported in each file I want to use the global context */
import { AppContext } from '../App';

function Key({ keyVal, bigKey }) {
  const { onSelectedLetter, onDelete, onEnter } =
    useContext(AppContext); /* import global values from context */

  const selectLetter = () => {
    if (keyVal === 'ENTER') {
      onEnter();
    } else if (keyVal === 'DELETE') {
      onDelete();
    } else {
      onSelectedLetter(keyVal);
    }
  };
  return (
    <div className="key" id={bigKey && 'big'} onClick={selectLetter}>
      {keyVal}
    </div>
  );
}

export default Key;
