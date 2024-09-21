const { Book, Author } = require('./model');

// Add a new book
const addBook = async (req, res) => {
    try {
        const author = await Author.findOne({ where: { surname: req.body.surname } });
        if (!author) return res.status(404).json({ message: 'Author not found' });

        const book = await Book.create({
            title: req.body.title,
            authorId: author.id,
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
        const books = await Book.findAll({ include: { model: Author, attributes: ['first_name', 'surname'] } });
        console.log(books);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
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

// Get author by name
const getAuthorByName = async (req, res) => {
    try {
        const author = await Author.findOne({ where: { first_name: req.params.name } });
        if (!author) return res.status(404).json({ message: 'Author not found' });

        const books = await Book.findAll({ where: { authorId: author.id } });
        res.status(200).json({ author, books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get books by author name
const getBooksByAuthorName = async (req, res) => {
    try {
        const author = await Author.findOne({ where: { first_name: req.params.authorName } });
        if (!author) return res.status(404).json({ message: 'Author not found' });

        const books = await Book.findAll({ where: { authorId: author.id } });
        res.status(200).json({ author, books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get author with books
const getAuthorWithBooks = async (req, res) => {
    try {
        const author = await Author.findOne({
            where: { id: req.params.id },
            include: Book // Include books
        });
        if (!author) return res.status(404).json({ message: 'Author not found' });

        res.status(200).json(author);
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

// Update book's author

const updateBookAuthor = async (req, res) => {
    try {
        const book = await Book.findOne({ where: { title: req.params.title } });
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const author = await Author.findOne({ where: { id: req.body.authorId } });
        if (!author) return res.status(404).json({ message: 'Author not found' });

        book.authorId = author.id;
        await book.save();

        res.status(200).json({ message: 'Book author updated successfully', book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.destroy({ where: { id: bookId } });
        
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Exporting the required functions
module.exports = {
    addBook,
    getAllBooks,
    getAllAuthors,
    addAuthor,
    getAuthorByName,
    getBooksByAuthorName,
    getAuthorWithBooks, 
    getBooksByGenre,
    updateBookAuthor,
    deleteBook
};