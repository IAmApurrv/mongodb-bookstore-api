# MongoDB Bookstore API

This is a simple RESTful API built with Node.js, and MongoDB for managing a bookstore. It allows you to perform CRUD operations on books stored in a MongoDB database.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/IAmApurrv/mongodb-bookstore-api.git
   ```

2. Install dependencies:
   ```bash
   cd mongodb-bookstore-api
   npm install
   ```

3. Set up MongoDB:
   - Ensure you have MongoDB installed and running locally or specify your MongoDB Atlas URI in `db.js` file.
   - Update the MongoDB URI in `db.js` to point to your MongoDB database.

4. Start the server:
   ```bash
   npm start
   ```

## Usage

### Endpoints

- `GET /books`: Get all books.
- `GET /books/:id`: Get a single book by ID.
- `POST /books`: Add a new book.
- `PATCH /books/:id`: Update a book by ID.
- `DELETE /books/:id`: Delete a book by ID.

### Request and Response Examples

#### GET /books

Request:
```http
GET /books
```

Response:
```json
[
  {
    "_id": "61671b12b430c34a01ef267a",
    "title": "Book Title",
    "author": "Author Name",
    "pages": 250,
    "rating": 9
  },
  {
    "_id": "61671b1ab430c34a01ef267b",
    "title": "Another Book",
    "author": "Another Author",
    "pages": 300,
    "rating": 8
  }
]
```

#### GET /books/:id

Request:
```http
GET /books/61671b12b430c34a01ef267a
```

Response:
```json
{
  "_id": "61671b12b430c34a01ef267a",
  "title": "Book Title",
  "author": "Author Name",
  "pages": 250,
  "rating": 9
}
```

#### POST /books

Request:
```http
POST /books
Content-Type: application/json

{
  "title": "New Book",
  "author": "New Author",
  "pages": 200,
  "rating": 7
}
```

Response:
```json
{
  "acknowledged": true,
  "insertedId": "61671b76b430c34a01ef267c"
}
```

#### PATCH /books/:id

Request:
```http
PATCH /books/61671b76b430c34a01ef267c
Content-Type: application/json

{
  "rating": 8
}
```

Response:
```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

#### DELETE /books/:id

Request:
```http
DELETE /books/61671b12b430c34a01ef267a
```

Response:
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

