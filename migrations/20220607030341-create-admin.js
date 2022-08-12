'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Admins', {
      adminId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Admins');
  }
};
