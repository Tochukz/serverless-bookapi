'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // define association here
      models.Book.belongsTo(models.Subcategory, {foreignKey: 'subcategoryId', sourceKey: 'subcategoryId', as: 'subcategory'})
    }
  };
  Book.init({
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    edition: DataTypes.STRING,
    price: DataTypes.FLOAT,
    img: DataTypes.STRING,
    availability: DataTypes.INTEGER,
    details: DataTypes.TEXT,
    pages: DataTypes.INTEGER,
    language: DataTypes.STRING,
    subcategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  });
  return Book;
};