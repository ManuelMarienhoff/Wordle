import { useContext } from 'react';
import { AppContext } from '../App';

function GameOver() {
  const { gameOver, correctWord, currentAttempt, resetGame } =
    useContext(AppContext);

  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? 'Congratulations!' : 'You failed'}</h3>
      {gameOver.guessedWord == false ? (
        <h1>Correct word was: {correctWord}</h1>
      ) : (
        ''
      )}
      {gameOver.guessedWord && (
        <h3>You guessed in {currentAttempt.attempt} attempts</h3>
      )}
      <div className="resetButton" onClick={resetGame}>
        Play again
      </div>
    </div>
  );
}

export default GameOver;
