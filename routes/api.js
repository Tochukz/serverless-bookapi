const express = require('express');
const router = express.Router();

const { Category, Subcategory, Book } = require('../models');

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: ['categoryId', 'name'],
      include: [
        {
          model: Subcategory, 
          as: 'subcategories',
          attributes: ['subcategoryId', 'name']
        }
      ]
    });
    const sub = await categories[0].getSubcategories();
    res.send(categories);
  } catch(err) {
    return next(err);
  }
});

router.get('/categories/:categoryId', async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findOne({ 
      where: { 
        categoryId 
      }, 
      attributes: ['categoryId', 'name'],
      include: [
        {
          model: Subcategory, 
          as: 'subcategories',
          attributes: ['subcategoryId', 'name']
        }
      ]
    });
    res.send(category);
  } catch(err) {
    return next(err);
  }
});

router.get('/subcategories', async (req, res, next) => {
  try {
    const subcategories = await Subcategory.findAll({
      include: [
        {
          model: Category, 
          as: 'category',
          attributes: ['categoryId', 'name'],
        }, 
        {
          model: Book, 
          as: 'books',
          attributes: ['bookId', 'title', 'author', 'price', 'edition', 'availability', 'img']
        }
      ],
      attributes: ['subcategoryId', 'name'],
    });
    res.send(subcategories);
  } catch(err) {
    return next(err);
  }
});

router.get('/subcategories/:subcategoryId', async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const subcategories = await Subcategory.findOne({
      where: { 
        subcategoryId 
      }, 
      include: [
        {
          model: Category, 
          as: 'category',
          attributes: ['categoryId', 'name'],
        }, 
        {
          model: Book, 
          as: 'books',
          attributes: ['bookId', 'title', 'author', 'price', 'edition', 'availability', 'img']
        }
      ]
    });
    res.send(subcategories);
  } catch(err) {
    return next(err);
  }
});

router.get('/books', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: {
        model: Subcategory, 
        as: 'subcategory',
        attributes: ['subcategoryId', 'name'],
        include: {
          model: Category,
          as: 'category',
          attributes: ['categoryId', 'name'],
        }
      }
    });
    res.send(books);
  } catch(err) {
    return next(err);
  }
});

router.get('/books/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const books = await Book.findOne({
      where: { 
        bookId 
      }, 
      include: [
        {
          model: Subcategory, 
          as: 'subcategory',
          attributes: ['subcategoryId', 'name'],
          include: {
            model: Category,
            as: 'category',
            attributes: ['categoryId', 'name'],
          }
        }
      ]
    });
    res.send(books);
  } catch(err) {
    return next(err);
  }
});

router.post('/order/create', async(req, res, next) => {
  try {
    return res.json(req.body);
  } catch(err) {
    return next(err);
  }
})

module.exports = router;