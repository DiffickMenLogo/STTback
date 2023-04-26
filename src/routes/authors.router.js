const router = require('express').Router();
const {getAllAuthors} = require('../database');

router.get('/authors', async (req, res, next) => {
  try{
    const authors = await getAllAuthors();
    res.json(authors)
  } catch (e) {
    next(e)
  }
})

module.exports = router