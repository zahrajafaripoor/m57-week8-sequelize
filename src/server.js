const express = require('express');
const bookRouter = require('./books/routes'); // مسیر درست به فایل routes
const sequelize = require('./db/connection'); // وارد کردن sequelize
const { Author, Book } = require('./books/model'); // وارد کردن مدل‌ها

const app = express();
const port = process.env.PORT || 5001;

// بررسی اتصال به دیتابیس
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // راه‌اندازی سرور فقط در صورت موفق بودن اتصال به دیتابیس
    app.use(express.json());
    app.use('/books', bookRouter); // اضافه کردن مسیر برای کتاب‌ها

    // تعریف روابط
    const syncTables = () => {
      Author.hasMany(Book);
      Book.belongsTo(Author);
      Book.sync({ alter: true });
      Author.sync({ alter: true });
    };

    syncTables(); // فراخوانی تابع برای راه‌اندازی روابط

    app.get('/health', (req, res) => {
      res.status(200).json({ message: 'API is healthy' });
    });

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();