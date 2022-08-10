import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect, ReactNode } from 'react';
import './App.css';
import Card from './Card';

interface Provider {
  type: any;
}

interface RoundResult {
  roundNumber: number;
  winner: string;
  playerChoice: string;
  computerChoice: string;
  status: string;
  playerScore: number;
  computerScore: number;
}

function App() {
  const [playerSelection, setPlayerSelection] = useState('');
  const [computerSelection, setCompterSelection] = useState('');

  const [roundStatus, setRoundStatus] = useState('');

  const [gameStatus, setGameStatus] = useState(<div></div>);
  const [gameWinner, setGameWinner] = useState('');

  const [round, setRound] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);

  // const [cardArray, setCardArray] = useState<JSX.Element[]>([]);
  const [roundWinner, setRoundWinner] = useState('');

  const [gameOver, setGameOver] = useState('');
  const [table, setTable] = useState(<div></div>);

  type Rps = 'rock' | 'paper' | 'scissors';
  const MAX_ROUNDS = 3;

  function onRoundComplete(roundResult: RoundResult) {
    console.log('->> roundResult:', roundResult);

    // check whether this is the last round. if yes, setGameOver to true.
    if (round >= MAX_ROUNDS) {
      // => game over.
    } else {
      //
    }
    // and call onGameComplete();
  }

  function onGameComplete() {
    console.log('game over');
  }

  function playRound(playerChoice: Rps, computerChoice: Rps) {
    // console.log('round(before):', round);
    // setRound((prev) => prev + 1);
    // console.log('round(after):', round);

    console.log('playerChoice', playerChoice);
    console.log('computerChoice', computerChoice);

    let _round = round;
    let _roundWinner = 'tie';
    let _playerScore = playerScore;
    let _computerScore = computerScore;
    let _roundStatus = roundStatus;

    if (playerChoice === 'rock') {
      if (computerChoice === 'rock') {
        _roundWinner = 'tie';
        _roundStatus = "'It's a tie'";
      } else if (computerChoice === 'paper') {
        _roundWinner = 'computer';
        _computerScore++;
        _roundStatus = 'Computer wins';
      } else {
        _roundWinner = 'player';
        _playerScore++;
        _roundStatus = 'Player wins';
      }
    } else if (playerChoice === 'paper') {
      if (computerChoice === 'paper') {
        _roundWinner = 'tie';
        _roundStatus = "It's a tie";
      } else if (computerChoice === 'scissors') {
        _roundWinner = 'computer';
        _computerScore++;
        _roundStatus = 'Computer wins';
      } else {
        _roundWinner = 'player';
        _playerScore++;
        _roundStatus = 'Player wins';
      }
    } else {
      if (computerChoice === 'scissors') {
        _roundWinner = 'tie';
        _roundStatus = "It's a tie";
      } else if (computerChoice === 'rock') {
        _roundWinner = 'computer';
        _computerScore++;
        _roundStatus = 'Computer wins';
      } else {
        _roundWinner = 'player';
        _playerScore++;
        _roundStatus = 'Player wins';
      }
    }

    console.log('roundWinner:', _roundWinner);

    if (_roundWinner !== 'tie') {
      _round++;

      setRound(_round);
      setPlayerScore(_playerScore);
      setComputerScore(_computerScore);

      const roundResult: RoundResult = {
        roundNumber: _round,
        winner: _roundWinner,
        playerChoice: playerChoice,
        computerChoice: computerChoice,
        playerScore: _playerScore,
        computerScore: _computerScore,
        status: _roundStatus
      };

      setRoundWinner(_roundWinner);

      const _roundResults = [...roundResults, roundResult];
      setRoundResults(_roundResults);
      onRoundComplete(roundResult);
    } else {
      console.log('TIE. Sorry, you must have another go!');
    }
  }

  function getComputerChoice(): Rps {
    let generateRandomNumber: number = Math.random() * 3;
    let generatedNumberToInteger: number = Math.floor(generateRandomNumber + 1);
    if (generatedNumberToInteger == 1) {
      return 'rock';
    } else if (generatedNumberToInteger == 2) {
      return 'paper';
    } else {
      return 'scissors';
    }
  }

  // const lists: JSX.Element[] = []

  function handleClick(e: any) {
    // todo - check if game is over. if yes, prevent function from proceeding.
    let playerChoice: Rps = e.target.value;
    let computerChoice = getComputerChoice();
    playRound(playerChoice, computerChoice);
  }

  return (
    <div className="app">
      {/* <div>Round: {round}</div> */}
      <button value="rock" onClick={handleClick}>
        Rock
      </button>
      <button value="paper" onClick={handleClick}>
        Paper
      </button>
      <button value="scissors" onClick={handleClick}>
        Scissors
      </button>
      <ul>
        {roundResults.map((result: RoundResult) => (
          <li key={Math.random() * 20}>
            <Card
              computerScore={result.computerScore}
              playerScore={result.playerScore}
              playerChoice={result.playerChoice}
              computerChoice={result.computerChoice}
              round={result.roundNumber}
              statusElement={<div>{result.status}</div>}
            />
          </li>
        ))}
      </ul>
      <div>{table}</div>
      <h3>{gameOver}</h3>
      <h4>{gameWinner}</h4>
    </div>
  );
}

export default App;
