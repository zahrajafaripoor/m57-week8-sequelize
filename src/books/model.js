const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

// Define the Author model
const Author = sequelize.define('author', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, { timestamps: false });

// Define the Book model
const Book = sequelize.define(
    "book",
    {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            references: {
                model: Author,
                key: 'id'
            }
        },
        genre: {
            type: DataTypes.STRING,
            defaultValue: "some genre",
        }
    },
    { timestamps: false }
);

// Set up associations
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });
Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });

// Export both models
module.exports = {
    Book,
    Author
};