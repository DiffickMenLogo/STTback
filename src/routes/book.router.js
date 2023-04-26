const { getAllBooks, createBook, deleteBook, findOneBook } = require('../database');

const router = require('express').Router();

// Route to get all books
router.get('/books', async (req, res, next) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
});


// Route to add a book
router.post('/books', async (req, res, next) => {  const { title, author, description, text } = req.body;
  try {
    const candidate = await findOneBook(title);
    
    if(candidate){
        return res.status(400).json({
            message: 'Book with this title has alrady exist.'
        })
    }
    

    const book = await createBook({ title, author, description, text });
    res.json(book);
  } catch (error) {
    next(error);
  }
});


// Route to delete a book by ID
router.delete('/books/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await deleteBook(id);
    res.json(book);
  } catch (error) {
    next(error);
  }
});


module.exports = router;