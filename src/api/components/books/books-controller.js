/* eslint-disable class-methods-use-this */
const service = require('./books-service');

class BooksController {
  async getBooks(req, res) {
    try {
      const data = await service.getBooks();
      res.json({ data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async createBook(req, res) {
    try {
      const data = await service.createBook(req.body);
      res.status(201).json({ data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getBookById(req, res) {
    try {
      const data = await service.getBookById(req.params.id);
      res.json({ data });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async updateBook(req, res) {
    try {
      const data = await service.updateBook(req.params.id, req.body);
      res.json({ data });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async deleteBook(req, res) {
    try {
      await service.deleteBook(req.params.id);
      res.json({ message: 'Book berhasil dihapus' });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = new BooksController();
