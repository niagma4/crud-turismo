const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('✅ Connected to the MySQL database');
});

module.exports = app;