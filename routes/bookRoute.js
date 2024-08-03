const express = require('express');
const router = express.Router();
const Books = require('../models/book');

const booksCount = Books.countDocuments();
const dataLimit = 10;

router.get('/', async (req, res) => {
    try {
        if(booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            res.render('home', { data: books });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            res.render('home', { data: books });
        }
        
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { bookName, bookAuthor, bookPages, bookPrice } = req.body;
        if (!bookName || typeof bookName !== 'string') {
            return res.status(400).send('Invalid book name');
        }
        if (!bookAuthor || typeof bookAuthor !== 'string') {
            return res.status(400).send('Invalid book author');
        }
        if (!bookPages || typeof bookPages !== 'string' || bookPages <= 0) {
            return res.status(400).send('Invalid book pages');
        }
        if (!bookPrice || typeof bookPrice !== 'string' || bookPrice < 0) {
            return res.status(400).send('Invalid book price');
        }

        const newBook = await Books.create({
            name: bookName,
            author: bookAuthor,
            pages: bookPages,
            price: bookPrice,
            state: "Available",
            softDelete: false
        });
        if(booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            res.render('home', { data: books });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            res.render('home', { data: books });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/issue', async (req, res) => {
    try {
        const { bookName } = req.body;
        await Books.findOneAndUpdate({ name: bookName }, { $set: { state: "Issued" } });
        if(booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            res.render('home', { data: books });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            res.render('home', { data: books });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/return', async (req, res) => {
    try {
        const { bookName } = req.body;
        await Books.findOneAndUpdate({ name: bookName }, { $set: { state: "Available" } });
        if(booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            res.render('home', { data: books });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            res.render('home', { data: books });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { bookName } = req.body;
        await Books.findOneAndUpdate({ name: bookName }, { $set: { softDelete: true } });
        if(booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            res.render('home', { data: books });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            res.render('home', { data: books });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit', async (req,res) => {
    try {
        const { selectedBook, newBookName, newBookAuthor, newBookPages, newBookPrice } = req.body;
        await Books.findOneAndUpdate({ name: selectedBook }, { name: newBookName, author: newBookAuthor, pages: newBookPages, price: newBookPrice });
        if(booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            res.render('home', { data: books });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            res.render('home', { data: books });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
