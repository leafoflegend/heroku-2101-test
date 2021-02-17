const express = require('express');
const { Sequelize } = require('sequelize');

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost/heroku_2101_test';

const app = express();
const db = new Sequelize(DATABASE_URL)

app.get('/health', (req, res) => {
  res.send({
    message: 'I am a healthy server.',
  });
});

const startServer = async () => {
  await db.authenticate();

  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`);
  });
};

startServer();
