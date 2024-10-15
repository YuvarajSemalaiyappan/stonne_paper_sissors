const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

app.post('/api/save-game', async (req, res) => {
  try {
    const newGame = await prisma.game.create({
      data: req.body
    });
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: 'Error saving game', error });
  }
});

app.get('/api/games', async (req, res) => {
  try {
    const games = await prisma.game.findMany();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving games', error });
  }
});

module.exports = { app, testDbConnection };
