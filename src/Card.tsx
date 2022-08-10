import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import props from 'prop-types';

export interface CardProps {
  round: number;
  playerChoice: string;
  computerChoice: string;
  statusElement: JSX.Element;
  playerScore: number;
  computerScore: number;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="card">
      <h4>Round {props.round}</h4>
      <p>You selected: {props.playerChoice}</p>
      <p>Computer selected: {props.computerChoice}</p>
      {props.statusElement}
      <p>Your score: {props.playerScore}</p>
      <p>Computer score: {props.computerScore}</p>
    </div>
  );
};

export default Card;
