'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      bookId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },  
      subcategoryId: {
        type: Sequelize.INTEGER,       
        references: {
          model: 'Subcategories',
          key: 'subcategoryId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },          
      author: {
        type: Sequelize.STRING
      },
      edition: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT
      },     
      img: {
        type: Sequelize.STRING
      },
      availability: {
        type: Sequelize.INTEGER,
      },
      details: {
        type: Sequelize.TEXT,
      },
      pages: {
        type: Sequelize.INTEGER,
      },
      language: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  }
};