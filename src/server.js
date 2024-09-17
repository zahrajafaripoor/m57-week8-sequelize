require("dotenv").config();
const express = require("express");

const bookRouter = require("./books/routes")
const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use(bookRouter);

// Corrected route for health check
app.get("/health", (req, res) => {
    res.status(200).json({ message: "API is healthy" });
});

app.listen(5001, () => {
    console.log(`Server is listening on port ${port}`);
});