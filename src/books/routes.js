const {Router} = require("express");
const bookRouter = Router();

const{ addBook} = require("./controllers");

bookRouter.post("/books/addbook", addBook);

module.exports = bookRouter;