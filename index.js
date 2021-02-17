const express = require('express');
const { Sequelize } = require('sequelize');

const PORT = process.env.PORT || 3000;
let DATABASE_URL = 'postgres://localhost/heroku_2101_test';
const SEQUELIZE_OPTIONS = {};

if (process.env.DATABASE_URL) {
  DATABASE_URL = process.env.DATABASE_URL;
  SEQUELIZE_OPTIONS.ssl = true;
}

const app = express();
const db = new Sequelize(DATABASE_URL, SEQUELIZE_OPTIONS);

app.get('/health', (req, res) => {
  res.send({
    message: 'I am a healthy server.',
  });
});

const startServer = async () => {
  await db.sync();

  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`);
  });
};

startServer();
