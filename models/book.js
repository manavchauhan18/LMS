const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    name: String,
    author: String,
    pages: Number,
    price: Number,
    state: String
});

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
