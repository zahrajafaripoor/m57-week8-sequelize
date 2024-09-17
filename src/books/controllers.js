const addBook = async (req, res) => {
    try {
        // Perform the main operation (e.g., adding a book)
        res.status(201).json({ message: "success" });
    } catch (error) {
        // If an error occurs, handle it
        res.status(500).json({ message: error.message, error: error });
    }
};

// Export the addBook function
module.exports = {
    addBook,
};