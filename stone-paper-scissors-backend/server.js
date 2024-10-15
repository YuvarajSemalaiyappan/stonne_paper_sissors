const { app, testDbConnection } = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await testDbConnection();
  console.log(`Server running on port ${PORT}`);
});
