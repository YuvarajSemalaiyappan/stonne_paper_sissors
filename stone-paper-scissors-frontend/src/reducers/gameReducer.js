const initialState = {
    player1Name: '',
    player2Name: '',
    player1Choice: '',
    player2Choice: '',
    rounds: [],
    currentRound: 1,
    gameOver: false,
    isGameStarted: false,
    player1Wins: 0,
    player2Wins: 0,
  };
  
  const gameReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PLAYER_NAMES':
        return {
          ...state,
          player1Name: action.payload.player1Name,
          player2Name: action.payload.player2Name,
        };
      case 'START_GAME':
        return {
          ...state,
          isGameStarted: true,
        };
      case 'SET_CHOICES':
        return {
          ...state,
          player1Choice: action.payload.player1Choice || state.player1Choice,
          player2Choice: action.payload.player2Choice || state.player2Choice,
        };
      case 'ADD_ROUND': {
        const newRound = action.payload.round;
        const newPlayer1Wins = action.payload.winner === 'player1' ? state.player1Wins + 1 : state.player1Wins;
        const newPlayer2Wins = action.payload.winner === 'player2' ? state.player2Wins + 1 : state.player2Wins;
        
        // Increment currentRound here and set gameOver accordingly
        const newCurrentRound = state.currentRound + 1;
        const newGameOver = newCurrentRound > 6; // Game ends after 6 rounds
  
        return {
          ...state,
          rounds: [...state.rounds, newRound],
          player1Wins: newPlayer1Wins,
          player2Wins: newPlayer2Wins,
          currentRound: newCurrentRound,
          gameOver: newGameOver,
          player1Choice: '',
          player2Choice: '',
        };
      }
      case 'END_GAME':
        return {
          ...state,
          gameOver: true,
        };
      default:
        return state;
    }
  };
  
  export default gameReducer;
  