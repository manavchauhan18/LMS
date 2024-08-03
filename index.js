const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const booksRoutes = require('./routes/bookRoute');
const path = require('path');

mongoose.connect("mongodb://localhost:27017/bookLibrary", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log('MongoDB connection error:', err);
});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', booksRoutes);

const port = 3001;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
    console.log("Jump to site: " + `http://localhost:${port}`);
});
