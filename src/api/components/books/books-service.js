/* eslint-disable class-methods-use-this */
const repo = require('./books-repository');

class BooksService {
  async getBooks() {
    return repo.getAll();
  }

  async createBook(data) {
    return repo.create(data);
  }

  async getBookById(id) {
    const book = await repo.getById(id);
    if (!book) throw new Error('Book tidak ditemukan');
    return book;
  }

  async updateBook(id, data) {
    const book = await repo.update(id, data);
    if (!book) throw new Error('Book tidak ditemukan');
    return book;
  }

  async deleteBook(id) {
    const book = await repo.remove(id);
    if (!book) throw new Error('Book tidak ditemukan');
    return book;
  }
}

module.exports = new BooksService();
