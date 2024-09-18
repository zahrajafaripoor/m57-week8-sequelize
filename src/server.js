require('dotenv').config();
const express = require('express');
const bookRouter = require('./books/routes');
const sequelize = require('./db/connection'); 
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(bookRouter); // استفاده مستقیم از bookRouter

// مسیر بررسی سلامت
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

const syncTables = async () => {
  try {
    await sequelize.sync(); // سینک کردن مدل‌ها با دیتابیس
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
};

app.listen(port, () => {
  syncTables();
  console.log(`Server is listening on port ${port}`);
});