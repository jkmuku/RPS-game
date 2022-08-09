import React from 'react';
import ReactDOM from 'react-dom';
import props from 'prop-types';
 
const Card=(props:any)=>
{
    
  return(
    <div className='card'>
        <h4>Round {props.roundcard}</h4>
        <p>You selected: {props.playercard}</p>
        <p>Computer selected: {props.computercard}</p>
        {props.statuscard}
        <p>Your score: {props.playerscorecard}</p>
        <p>Computer score: {props.computerscorecard}</p>
    </div>
  )
}
 
export default Card;