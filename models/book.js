const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const booksSchema = new mongoose.Schema({
    bookId: { type: Number, unique: true },
    name: String,
    author: String,
    pages: Number,
    price: Number,
    state: String,
    softDelete: Boolean
});

booksSchema.plugin(AutoIncrement, { inc_field: 'bookId' });
const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
