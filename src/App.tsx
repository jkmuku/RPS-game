import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useEffect, ReactNode } from "react";
import { resourceLimits } from "worker_threads";
import "./App.css";
import Card from "./Card";
import Table, { TableProps } from "./Table";

interface RoundResult {
  roundNumber: number;
  winner: string;
  playerChoice: string;
  computerChoice: string;
  status: string;
  playerScore: number;
  computerScore: number;
  isPlayerWinsRound: boolean;
}

function App() {
  const [playerSelection, setPlayerSelection] = useState("");
  const [computerSelection, setCompterSelection] = useState("");

  const [roundStatus, setRoundStatus] = useState("");

  const [gameStatus, setGameStatus] = useState(<div></div>);
  const [gameWinner, setGameWinner] = useState("");

  const [round, setRound] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const [isPlayerWinsRound, setIsPlayerWinsRound] = useState(false);
  const [isPlayerWinsGame, setIsPlayerWinsGame] = useState(false);

  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);

  const [roundWinner, setRoundWinner] = useState("");

  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  // const [table, setTable] = useState();

  type Rps = "rock" | "paper" | "scissors";
  const MAX_ROUNDS = 3;

  function onRoundComplete(roundResult: RoundResult) {
    console.log("->> roundResult:", roundResult);
    let _gameOver = gameOver;
    // check whether this is the last round. if yes, setGameOver to true.
    if (
      roundResult.playerScore > MAX_ROUNDS / 2 ||
      roundResult.computerScore > MAX_ROUNDS / 2
    ) {
      // => game over.
      _gameOver = true;
      // setGameOver(_gameOver)
      setGameOver(_gameOver);
      // console.log("is Game gameover true?::",gameOver)
    } else {
      //
    }
    // and call onGameComplete();

    if (_gameOver === true) {
      const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
        "button"
      );
      buttons.forEach((elem) => {
        elem.disabled = true;
      });
      onGameComplete(roundResult);
    }
  }

  function onGameComplete(roundResult: RoundResult) {
    console.log("GAMEOVER!!!!!");
    setGameOverMessage("GAMEOVER!");
    console.log(gameOverMessage);
    displayGameWinner(roundResult);
  }

  function displayGameWinner(roundResult: RoundResult) {
    if (roundResult.playerScore > roundResult.computerScore) {
      setGameWinner("You win!");
      setIsPlayerWinsGame(true);
    } else if (roundResult.computerScore > roundResult.playerScore) {
      setGameWinner("Computer wins!");
      setIsPlayerWinsGame(false);
    }
  }

  function playRound(playerChoice: Rps, computerChoice: Rps) {
    // console.log('round(before):', round);
    // setRound((prev) => prev + 1);
    // console.log('round(after):', round);

    console.log("playerChoice", playerChoice);
    console.log("computerChoice", computerChoice);

    let _round = round;
    let _roundWinner = "tie";
    let _playerScore = playerScore;
    let _computerScore = computerScore;
    let _roundStatus = roundStatus;
    let _isPlayerWinsRound = isPlayerWinsRound;

    if (playerChoice === "rock") {
      if (computerChoice === "rock") {
        _roundWinner = "tie";
        _roundStatus = "'It's a tie'";
      } else if (computerChoice === "paper") {
        _roundWinner = "computer";
        _computerScore++;
        _roundStatus = "Computer wins!";
        _isPlayerWinsRound = false;
      } else {
        _roundWinner = "player";
        _playerScore++;
        _roundStatus = "You win!";
        _isPlayerWinsRound = true;
      }
    } else if (playerChoice === "paper") {
      if (computerChoice === "paper") {
        _roundWinner = "tie";
        _roundStatus = "It's a tie!";
      } else if (computerChoice === "scissors") {
        _roundWinner = "computer";
        _computerScore++;
        _roundStatus = "Computer wins!";
        _isPlayerWinsRound = false;
      } else {
        _roundWinner = "player";
        _playerScore++;
        _roundStatus = "You win!";
        _isPlayerWinsRound = true;
      }
    } else {
      if (computerChoice === "scissors") {
        _roundWinner = "tie";
        _roundStatus = "It's a tie!";
      } else if (computerChoice === "rock") {
        _roundWinner = "computer";
        _computerScore++;
        _roundStatus = "Computer wins!";
        _isPlayerWinsRound = false;
      } else {
        _roundWinner = "player";
        _playerScore++;
        _roundStatus = "You win!";
        _isPlayerWinsRound = true;
      }
    }

    console.log("roundWinner:", _roundWinner);

    if (_roundWinner !== "tie") {
      _round++;
      console.log("new round:", _round);
      setRound(_round);
      setPlayerScore(_playerScore);
      setComputerScore(_computerScore);
      setIsPlayerWinsRound(_isPlayerWinsRound);
      console.log("Normal round:::", round);

      const roundResult: RoundResult = {
        roundNumber: _round,
        winner: _roundWinner,
        playerChoice: playerChoice,
        computerChoice: computerChoice,
        playerScore: _playerScore,
        computerScore: _computerScore,
        status: _roundStatus,
        isPlayerWinsRound: _isPlayerWinsRound,
      };

      setRoundWinner(_roundWinner);
      // console.log("Round winner after setting state::", roundWinner)

      const _roundResults = [...roundResults, roundResult];
      setRoundResults(_roundResults);
      onRoundComplete(roundResult);
    } else {
      console.log("TIE. Sorry, you must have another go!");
    }
  }

  function getComputerChoice(): Rps {
    let generateRandomNumber: number = Math.random() * 3;
    let generatedNumberToInteger: number = Math.floor(generateRandomNumber + 1);
    if (generatedNumberToInteger == 1) {
      return "rock";
    } else if (generatedNumberToInteger == 2) {
      return "paper";
    } else {
      return "scissors";
    }
  }

  function handleClick(e: any) {
    // todo - check if game is over. if yes, prevent function from proceeding.
    let playerChoice: Rps = e.target.value;
    let computerChoice: Rps = getComputerChoice();
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
          <li key={result.roundNumber.toString()}>
            <Card
              computerScore={result.computerScore}
              playerScore={result.playerScore}
              playerChoice={result.playerChoice}
              computerChoice={result.computerChoice}
              round={result.roundNumber}
              statusElement={
                <p
                  className="status"
                  style={{
                    color: result.isPlayerWinsRound ? "#2E9545" : "#E32D2D",
                  }}
                >
                  {result.status}
                </p>
              }
            />
          </li>
        ))}
      </ul>
      <div className="game-over">{gameOverMessage}</div>
      <Table computerScore={computerScore} playerScore={playerScore} />
      <div
        className="game-winner"
        style={{ color: isPlayerWinsGame ? "#2E9545" : "#E32D2D" }}
      >
        {gameWinner}
      </div>
    </div>
  );
}

export default App;
