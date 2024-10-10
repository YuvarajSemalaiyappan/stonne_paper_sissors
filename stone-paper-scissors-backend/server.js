const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});


const Game = sequelize.define('Game', {
  player1Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  player2Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rounds: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  player1Score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  player2Score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  winner: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


sequelize.sync()
  .then(() => console.log('PostgreSQL connected and tables created'))
  .catch(err => console.log('Error connecting to PostgreSQL:', err));

app.post('/api/save-game', async (req, res) => {
  try {
    const newGame = await Game.create(req.body);
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: 'Error saving game', error });
  }
});

app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving games', error });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
