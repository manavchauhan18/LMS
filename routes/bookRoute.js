const express = require('express');
const router = express.Router();
const Books = require('../models/book');

const dataLimit = 10;

router.get('/', async (req, res) => {
    try {
        const booksCount = await Books.countDocuments();
        if (booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: false
                    }
                }
            };
            res.render('home', { data: data });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            let pagLimit = Math.ceil(booksCount / dataLimit);
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: true,
                        pages: pagLimit
                    }
                }
            };
            res.render('home', { data: data });
        }

    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const booksCount = await Books.countDocuments();
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
        if (booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: false
                    }
                }
            };
            res.render('home', { data: data });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            let pagLimit = Math.ceil(booksCount / dataLimit);
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: true,
                        pages: pagLimit
                    }
                }
            };
            res.render('home', { data: data });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/issue', async (req, res) => {
    try {
        const booksCount = await Books.countDocuments();
        const { bookName } = req.body;
        await Books.findOneAndUpdate({ name: bookName }, { $set: { state: "Issued" } });
        if (booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: false
                    }
                }
            };
            res.render('home', { data: data });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            let pagLimit = Math.ceil(booksCount / dataLimit);
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: true,
                        pages: pagLimit
                    }
                }
            };
            res.render('home', { data: data });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/return', async (req, res) => {
    try {
        const booksCount = await Books.countDocuments();
        const { bookName } = req.body;
        await Books.findOneAndUpdate({ name: bookName }, { $set: { state: "Available" } });
        if (booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: false
                    }
                }
            };
            res.render('home', { data: data });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            let pagLimit = Math.ceil(booksCount / dataLimit);
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: true,
                        pages: pagLimit
                    }
                }
            };
            res.render('home', { data: data });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/delete', async (req, res) => {
    try {
        const booksCount = await Books.countDocuments();
        const { bookName } = req.body;
        await Books.findOneAndUpdate({ name: bookName }, { $set: { softDelete: true } });
        if (booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: false
                    }
                }
            };
            res.render('home', { data: data });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            let pagLimit = Math.ceil(booksCount / dataLimit);
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: true,
                        pages: pagLimit
                    }
                }
            };
            res.render('home', { data: data });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit', async (req, res) => {
    try {
        const booksCount = await Books.countDocuments();
        const { selectedBook, newBookName, newBookAuthor, newBookPages, newBookPrice } = req.body;
        await Books.findOneAndUpdate({ name: selectedBook }, { name: newBookName, author: newBookAuthor, pages: newBookPages, price: newBookPrice });
        if (booksCount < dataLimit) {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 });
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: false
                    }
                }
            };
            res.render('home', { data: data });
        } else {
            const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).limit(dataLimit);
            let pagLimit = Math.ceil(booksCount / dataLimit);
            let data = {
                status: true,
                data: {
                    response: books,
                    pag: {
                        status: true,
                        pages: pagLimit
                    }
                }
            };
            res.render('home', { data: data });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/page/:pageNumber', async (req, res) => {
    try {
        const pageNumber = req.params.pageNumber;
        const booksCount = await Books.countDocuments();
        let offset = (pageNumber - 1) * dataLimit;
        const books = await Books.find({ softDelete: false }).sort({ bookId: -1 }).skip(offset).limit(dataLimit);
        let pagLimit = Math.ceil(booksCount / dataLimit);
        let data = {
            status: true,
            data: {
                response: books,
                pag: {
                    status: true,
                    pages: pagLimit,
                    pageno: pageNumber
                }
            }
        };
        res.render('home', { data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
