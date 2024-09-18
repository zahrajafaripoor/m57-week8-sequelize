const { Router } = require("express");
const { addBook, getAllBooks, addAuthor, getAuthorByName } = require("./controllers");

const bookRouter = Router();

bookRouter.post("/books/addbook", addBook);
bookRouter.get("/books/getallbooks", getAllBooks);
bookRouter.post('/authors/add', addAuthor);
bookRouter.get('/authors/:name', getAuthorByName);

module.exports = bookRouter;