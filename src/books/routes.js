const express = require('express');
const router = express.Router();
const bookController = require('./controllers');

// Routes related to books
router.post('/addbook', bookController.addBook);
router.get('/allbooks', bookController.getAllBooks);
router.get('/genre/:genre', bookController.getBooksByGenre);

// Routes related to authors
router.post('/authors', bookController.addAuthor);
router.get('/authors/:name', bookController.getAuthorByName);
router.get('/author/:authorName', bookController.getBooksByAuthorName);
router.get('/authors', bookController.getAllAuthors);
router.put('/update/:id', bookController.updateBookAuthor);
router.put('/update-author/:title', bookController.updateBookAuthor); // Updates a book's author
router.delete('/delete/:id', bookController.deleteBook);

module.exports = router;
