import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameRecords = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGameRecords = async () => {
      try {
        const response = await axios.get('/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching game records:', error);
      }
    };

    fetchGameRecords();
  }, []);

  return (
    <div>
      <h1>Game Records</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            {game.player1Name} vs {game.player2Name} - Winner: {game.winner}
            <ul>
              {game.rounds.map((round, roundIndex) => (
                <li key={roundIndex}>
                  Round {roundIndex + 1}: {game.player1Name} chose {round.player1Choice}, {game.player2Name} chose {round.player2Choice} - Winner: {round.winner}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameRecords;
