'use strict';

const data = require('../data/books');

const bookData = data.map(book => {
    book.createdAt = new Date(), 
    book.updatedAt = new Date(), 
    book.deletedAt = null
    delete book.categoryId
    return book;
  }
);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books', bookData, {});    
  },

  down: async (queryInterface, Sequelize) => {   
    await queryInterface.bulkDelete('Books', null, {});     
  }
};

