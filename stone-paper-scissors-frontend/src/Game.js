import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Game = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const navigate = useNavigate();


  const determineWinner = (choice1, choice2) => {
    if (choice1 === choice2) return 'tie';
    if (
      (choice1 === 'stone' && choice2 === 'scissors') ||
      (choice1 === 'scissors' && choice2 === 'paper') ||
      (choice1 === 'paper' && choice2 === 'stone')
    ) {
      return 'player1';
    } else {
      return 'player2';
    }
  };


  const handleChoices = () => {
    const winner = determineWinner(player1Choice, player2Choice);
    setRounds([...rounds, { player1Choice, player2Choice, winner }]);


    if (winner === 'player1') {
      setPlayer1Wins(player1Wins + 1);
    } else if (winner === 'player2') {
      setPlayer2Wins(player2Wins + 1);
    }

    if (currentRound === 6) {
      setGameOver(true);
      saveGameData();
    } else {
      setCurrentRound(currentRound + 1);
      setPlayer1Choice('');
      setPlayer2Choice('');
    }
  };


  const startGame = () => {
    if (player1Name && player2Name) {
      setIsGameStarted(true);
    }
  };


  const getOverallWinner = () => {
    if (player1Wins > player2Wins) {
      return player1Name;
    } else if (player2Wins > player1Wins) {
      return player2Name;
    } else {
      return 'It\'s a tie!';
    }
  };


  const saveGameData = async () => {
    const gameData = {
      player1Name,
      player2Name,
      rounds,
      player1Score: player1Wins,
      player2Score: player2Wins,
      winner: getOverallWinner(),
    };

    try {
      const response = await axios.post('/api/save-game', gameData);
      console.log('Game data saved:', response.data);
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  };

  return (
    <div>
      <h1>Stone Paper Scissors Game</h1>

      {!isGameStarted ? (
        <div>
          <label>
            Player 1 Name:
            <input
              type="text"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              placeholder="Enter Player 1 Name"
            />
          </label>
          <br />

          <label>
            Player 2 Name:
            <input
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder="Enter Player 2 Name"
            />
          </label>
          <br />

          <button onClick={startGame} disabled={!player1Name || !player2Name}>
            Start Game
          </button>
        </div>
      ) : !gameOver ? (
        <div>
          <h2>Round {currentRound} of 6</h2>
          <p>Player 1: {player1Name}</p>
          <p>Player 2: {player2Name}</p>

          <h3>{player1Name}'s Turn</h3>
          <button onClick={() => setPlayer1Choice('stone')}>Stone</button>
          <button onClick={() => setPlayer1Choice('paper')}>Paper</button>
          <button onClick={() => setPlayer1Choice('scissors')}>Scissors</button>
          <p>Player 1 Choice: {player1Choice}</p>

          <h3>{player2Name}'s Turn</h3>
          <button onClick={() => setPlayer2Choice('stone')}>Stone</button>
          <button onClick={() => setPlayer2Choice('paper')}>Paper</button>
          <button onClick={() => setPlayer2Choice('scissors')}>Scissors</button>
          <p>Player 2 Choice: {player2Choice}</p>

          <button onClick={handleChoices} disabled={!player1Choice || !player2Choice}>
            Submit
          </button>
        </div>
      ) : (
        <div>
          <h2>Game Over</h2>
          <ul>
            {rounds.map((round, index) => (
              <li key={index}>
                Round {index + 1}: {player1Name} chose {round.player1Choice}, {player2Name} chose {round.player2Choice} - Winner: {round.winner === 'tie' ? 'Tie' : round.winner}
              </li>
            ))}
          </ul>

          <h3>Overall Winner: {getOverallWinner()}</h3>

          <button onClick={() => navigate('/game-records')}>Show Game Records</button>
        </div>
      )}
    </div>
  );
};

export default Game;
