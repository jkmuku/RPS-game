import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useEffect, ReactNode } from "react";
import "./App.css";
import Card from "./Card";

interface Provider {
  type: any;
}

function App() {
  const [playerSelection, setPlayerSelection] = useState("");
  const [computerSelection, setCompterSelection] = useState("");
  const [gameStatus, setGameStatus] = useState(<div></div>);
  const [gameWinner, setGameWinner] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(0);
  const [cardArrays, setCardArrays] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState("");
  const [table, setTable] = useState(<div></div>)


  type Rps = "rock" | "paper" | "scissors";
  function getWinner(playerSelection: Rps, computerSelection: Rps) {
    console.log("round =", round)
    setRound((prev) => prev + 1);
    console.log("aftersetround =", round)
    if (playerSelection == "rock") {
      if (computerSelection == "rock") {
        setGameStatus(<div className="tie-status">It's a tie</div>);
      } else if (computerSelection == "paper") {
        setGameStatus(<div className="comp-status">Computer wins</div>);
        setComputerScore((prev) => prev + 1);
      } else {
        setGameStatus(<div className="play-status">Player wins</div>);
        setPlayerScore((prev) => prev + 1);
      }
    } else if (playerSelection == "paper") {
      if (computerSelection == "paper") {
        setGameStatus(<div className="tie-status">It's a tie</div>);
      } else if (computerSelection == "scissors") {
        setGameStatus(<div className="comp-status">Computer wins</div>);
        setComputerScore((prev) => prev + 1);
      } else {
        setGameStatus(<div className="play-status">Player wins</div>);
        setPlayerScore((prev) => prev + 1);
      }
    } else {
      if (computerSelection == "scissors") {
        setGameStatus(<div className="tie-status">It's a tie</div>);
      } else if (computerSelection == "rock") {
        setGameStatus(<div className="comp-status">Computer wins</div>);
        setComputerScore((prev) => prev + 1);
      } else {
        setGameStatus(<div className="play-status">Player wins</div>);
        setPlayerScore((prev) => prev + 1);
      }
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
  // const lists: JSX.Element[] = []

  function handleClick(e: any) {
    let player: Rps = e.target.value;
    setPlayerSelection(player);
    let computer = getComputerChoice();
    setCompterSelection(computer);
    getWinner(player, computer);
    setCardArrays((prev) => [...prev, card]);
    if (round == 3) {
      const buttons: NodeListOf<HTMLButtonElement> =
        document.querySelectorAll("button");
      buttons.forEach((elem) => {
        elem.disabled = true;
      });
      setTable(<div className="table-component">
      <table>
        <thead>
          <tr>
            <th>Your score</th>
            <th>Computer score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{playerScore}</td>
            <td>{computerScore}</td>
          </tr>
        </tbody>
      </table>
    </div>)
      setGameOver("GAMEOVER!!!")
      if (playerScore > computerScore){
        setGameWinner("PLAYER WINS!")
      }else if (computerScore > playerScore){
        setGameWinner("COMPUTER WINS")
      }else{
        setGameWinner("IT'S A TIE!")
      } 
    }
  }
  
  let card = (
    <Card
      roundcard={round}
      playercard={playerSelection}
      computercard={computerSelection}
      statuscard={gameStatus}
      playerscorecard={playerScore}
      computerscorecard={computerScore}
    />
  );

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
        {cardArrays.map((cardArray) => (
          <li key={Math.random() * 20}>{cardArray}</li>
        ))}
      </ul>
      <div>{table}</div>
      <h3>{gameOver}</h3>
      <h4>{gameWinner}</h4>
    </div>
  );
}

export default App;
