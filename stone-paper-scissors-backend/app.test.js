const request = require('supertest');
const { app } = require('./app');

describe('API Tests', () => {
  
  it('should return an array of games', async () => {
    const response = await request(app).get('/api/games');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

 
  it('should save a new game', async () => {
    const newGame = {
      player1Name: "Alice",
      player2Name: "Bob",
      rounds: [1, 2, 3],
      player1Score: 2,
      player2Score: 1,
      winner: "Alice"
    };

    const response = await request(app).post('/api/save-game').send(newGame);
    expect(response.status).toBe(201);
    expect(response.body.player1Name).toBe(newGame.player1Name);
  });
});
