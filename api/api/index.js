require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db');
const { installHandler } = require('./api_handler');

const port = process.env.API_SERVER_PORT || 3000;

const app = express();

(async function start() {
  try {
    await installHandler(app); // !!!!
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
