const { MongoClient } = require("mongodb")

let dbConnection
let uri = 'mongodb+srv://root:root@bookstore-mern.v4ejn78.mongodb.net/books?retryWrites=true&w=majority&appName=BookStore-MERN'

module.exports = {
    ConnectToDb: (cb) => {
        // MongoClient.connect('mongodb://localhost:27017/book-store')
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err);
                return cb(err)
            })
    },
    getDb: () => dbConnection
}