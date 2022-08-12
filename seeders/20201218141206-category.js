'use strict';

const data = require('../data/categories');

const categoryData = data.map(cat => ({...cat, createdAt: new Date(), updatedAt: new Date()}))
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', categoryData, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Categories', null, {});
  }
};
