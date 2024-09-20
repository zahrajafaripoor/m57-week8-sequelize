const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

// مدل نویسنده
const Author = sequelize.define('author', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING
    }
}, { timestamps: false });

// مدل کتاب
const Book = sequelize.define('book', {
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    publisher: {
        type: DataTypes.STRING,
        defaultValue: 'not known'
    },
    price: {
        type: DataTypes.INTEGER
    },
    genre: {
        type: DataTypes.STRING,
        defaultValue: 'not specified'
    },
    in_stock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, { timestamps: false });

Author.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(Author, { foreignKey: 'authorId' });

module.exports = {
    Book,
    Author
};