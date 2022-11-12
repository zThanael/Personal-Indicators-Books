const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const BookGenre = sequelize.define('bookGenre' ,{ 
   bookId: DataTypes.INTEGER,
   genreId: DataTypes.INTEGER
});

module.exports = BookGenre