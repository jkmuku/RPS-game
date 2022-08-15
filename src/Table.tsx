import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import props from 'prop-types';

export interface TableProps {
  playerScore: number;
  computerScore: number;
}

const Table: React.FC<TableProps> = (props) => {
  return (
    <table>
        <thead>
          <tr>
            <th>Your score</th>
            <th>Computer's score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.playerScore}</td>
            <td>{props.computerScore}</td>
          </tr>
        </tbody>
      </table>
  );
};

export default Table;