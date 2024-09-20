const { Book, Author } = require('./model');

// Add a new book
const addBook = async (req, res) => {
    try {
        const book = await Book.create({
            title: req.body.title,
            // authorId: req.body.authorId, 
            author: req.body.author, // استفاده مستقیم از نام نویسنده به عنوان فیلد
            publisher: req.body.publisher,
            price: req.body.price,
            genre: req.body.genre,
            in_stock: req.body.in_stock,
        });
        res.status(200).json({ message: "success", book });
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
        const author = await Author.create({
            first_name: req.body.first_name,
            surname: req.body.surname
        });
        res.status(201).json({ message: 'Author added successfully', author });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get author by name and associated books
const getAuthorByName = async (req, res) => {
    try {
        const author = await Author.findOne({ where: { first_name: req.params.name } });
        if (!author) return res.status(404).json({ message: 'Author not found' });

        const books = await Book.findAll({ where: { author: author.first_name } }); // استفاده از نام نویسنده به جای authorId
        res.status(200).json({ author, books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get books by genre
const getBooksByGenre = async (req, res) => {
    try {
        const books = await Book.findAll({ where: { genre: req.params.genre } });
        res.status(200).json({ message: "Success", books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Example for params (برای آزمایش و تست پارامترها)
const paramsExample = async (req, res) => {
    try {
        res.status(200).json({ message: "success", params: req.params });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// اکسپورت کردن توابع مورد نیاز
module.exports = {
    addBook,
    getAllBooks,
    addAuthor,
    getAuthorByName,
    paramsExample,
    getBooksByGenre
};