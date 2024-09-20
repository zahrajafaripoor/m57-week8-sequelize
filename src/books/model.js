const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

// Author model
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

// Book model
const Book = sequelize.define('book', {
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING, // به جای استفاده از authorId از نام نویسنده استفاده می‌کنیم
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
    // authorId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Author,
    //         key: 'id'
    //     }
    // }  // این قسمت را کامنت کردیم چون نیازی به استفاده از authorId نیست
}, { timestamps: false });

module.exports = {
    Book,
    Author
};