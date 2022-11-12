const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Book = sequelize.define('book' ,{ // Nome da tabela no define
    situationId: DataTypes.INTEGER,
    book: DataTypes.STRING,
    author: DataTypes.STRING,
    dateInit: DataTypes.DATEONLY,
    dateFinish: DataTypes.DATEONLY,
    rating: DataTypes.FLOAT,
    pages: DataTypes.INTEGER,
    comments: DataTypes.TEXT,
});

module.exports = Book