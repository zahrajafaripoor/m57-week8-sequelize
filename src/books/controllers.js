const { Book, Author } = require('./model');

// Add a new book
const addBook = async (req, res) => {
    try {
        const book = await Book.create({
            title: req.body.title,
            authorId: req.body.authorId,
            genre: req.body.genre,
        });
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new author
const addAuthor = async (req, res) => {
    try {
        const author = await Author.create({ name: req.body.name });
        res.status(201).json({ message: 'Author added successfully', author });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get author by name and associated books
const getAuthorByName = async (req, res) => {
    try {
        const author = await Author.findOne({
            where: { name: req.params.name },
            include: [{ model: Book, as: 'books' }]
        });
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const paramsExample = async (req, res) => {
    try {
        console.log("req.params:", req.params.title);

        res.status(200).json({ message: "success", params: req.params });
    } catch (error) {
        res.status(500).json({ message: error.message, error: error });
    }
};

//get book by 
const getBooksByGenre = async (req, res) => {
    try {
      const books = await Book.findAll({
        where: { genreId: req.params.genreId } // Use genreId to find books
      });
      res.status(200).json({ message: "Success", books });
    } catch (error) {
      res.status(500).json({ message: error.message, error });
    }
  };

module.exports = {
    addBook,
    getAllBooks,
    addAuthor,
    getAuthorByName,
    paramsExample: paramsExample, 
    getBooksByGenre
};