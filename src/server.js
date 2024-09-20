const express = require('express');
const bookRouter = require('./books/routes'); // Correct path to routes file
const sequelize = require('./db/connection'); // Importing Sequelize connection
const { Author, Book } = require('./books/model'); // Importing models

const app = express();
const port = process.env.PORT || 5001;

// Middleware for parsing JSON
app.use(express.json());

// Database connection and server initialization
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Setting up routes
    app.use('/books', bookRouter);

    // Defining associations
    Author.hasMany(Book, { foreignKey: 'authorId' });
    Book.belongsTo(Author, { foreignKey: 'authorId' });

    // Syncing models
    await Author.sync({ alter: true });
    await Book.sync({ alter: true });

    // Health check route
    app.get('/health', (req, res) => {
      res.status(200).json({ message: 'API is healthy' });
    });

    // Starting the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();