const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

const dbExports = {};
dbExports.db = db;

// register model
dbExports.Books = require('./books-schema')(mongoose);
dbExports.Gacha = require('./gacha-schema')(mongoose);

module.exports = dbExports;
