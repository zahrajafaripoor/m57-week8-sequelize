const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

// Define the Author model
const Author = sequelize.define('author', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, { timestamps: false });

// Define the Book model
const Book = sequelize.define('book', {
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        defaultValue: "some genre"
    }
}, { timestamps: false });

// Set up associations (if needed in future)
// Currently, Book does not have a foreign key referencing Author
// Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });
// Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });

// Export both models
module.exports = {
    Book,
    Author
};