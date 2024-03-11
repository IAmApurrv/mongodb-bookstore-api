const express = require("express")
const { ConnectToDb, getDb } = require('./db')
const { ObjectId } = require("mongodb");

// init app & middleware
const app = express()

app.use(express.json())

// db connection
let db
ConnectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log("App is running on port 3000.");
        })
        db = getDb()
    }
})



// routes

app.get('/books', (req, res) => {

    const page = req.query.p || 0
    const booksPerPage = 4

    let books = []
    db.collection('books')
        .find()
        // .sort({ rating: -1 })
        .skip(page * booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({ error: "could not fetch the documents." })
        })

    // res.json({ msg: "Welcome to the api" })
})

app.get('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
            // .findOne({ _id: ObjectId(req.params.id) })
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(500).json({ error: "could not fetch the documents." });
            });
    } else {
        res.status(500).json({ error: "ObjectId is not valid." })
    }
});

app.post('/books', (req, res) => {
    const book = req.body
    db.collection('books')
        .insertOne(book)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ err: "could not add a new document." })
        })
})
// {
//     "title": "book1",
//     "author": "author1",
//     "pages": 1000,
//     "rating": 8
// }

app.patch('/books/:id', (req, res) => {
    const updates = req.body
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ error: "could not update the documents." });
            });
    } else {
        res.status(500).json({ error: "ObjectId is not valid." })
    }
})
// {
//     "pages": 1500,
//     "rating": 7,
//     "as": 5
// }

app.delete('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ error: "could not delete the documents." });
            });
    } else {
        res.status(500).json({ error: "ObjectId is not valid." })
    }
})

