const express = require('express');
const { Sequelize } = require('sequelize');

const PORT = process.env.PORT || 3000;
const SEQUELIZE_OPTIONS = {
  uri: 'postgres://localhost/heroku_2101_test',
};

if (process.env.DATABASE_URL) {
  SEQUELIZE_OPTIONS.uri = process.env.DATABASE_URL;
  SEQUELIZE_OPTIONS.ssl = true;
}

const app = express();
const db = new Sequelize()

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
