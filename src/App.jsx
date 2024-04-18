import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useState } from 'react';
import { defaultBoard } from './DefaultBoard';

import { createContext } from 'react'; //allows me to create a global context for the app
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(defaultBoard);
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{ board, setBoard }}>
        {/* everything inside this provider can access to the values*/}
        <Board />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
