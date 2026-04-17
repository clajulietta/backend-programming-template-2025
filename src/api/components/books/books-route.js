const express = require('express');
const controller = require('./books-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/books', route);

  route.get('/', controller.getBooks);
  route.post('/', controller.createBook);
  route.get('/:id', controller.getBookById);
  route.put('/:id', controller.updateBook);
  route.delete('/:id', controller.deleteBook);
};
