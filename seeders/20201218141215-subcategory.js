'use strict';

const data = require('../data/subcategories');

const subCategoryData = data.map(sub => ({...sub, createdAt: new Date(), updatedAt: new Date()}))
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Subcategories', subCategoryData, {});    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subcategories', null, {});     
  }
};

