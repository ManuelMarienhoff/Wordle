import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useState } from 'react';
import { defaultBoard } from './DefaultBoard';

import { createContext } from 'react'; //allows me to create a global context for the app
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(defaultBoard);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{ board, setBoard, currentAttempt, setCurrentAttempt }}>
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
