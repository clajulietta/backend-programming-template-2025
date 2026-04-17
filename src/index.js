require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const logger = require('./core/logger')('app');

const gachaRoutes = require('./api/components/gacha/gacha-route');

const booksRoutes = require('./api/components/books/books-route');

const app = express();
app.use(express.json());

app.use('/gacha', gachaRoutes);
booksRoutes(app);

mongoose.connect(process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});
