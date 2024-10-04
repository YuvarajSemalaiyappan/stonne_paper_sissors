const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

const gameSchema = new mongoose.Schema({
  player1Name: String,
  player2Name: String,
  rounds: [{ player1Choice: String, player2Choice: String, winner: String }],
  player1Score: Number,
  player2Score: Number,
  winner: String,
});

const Game = mongoose.model('Game', gameSchema);


app.post('/api/save-game', async (req, res) => {
  const newGame = new Game(req.body);
  try {
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: 'Error saving game', error });
  }
});

app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving games', error });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
