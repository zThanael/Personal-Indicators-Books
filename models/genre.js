const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Genre = sequelize.define('genre' ,{ 
   genre: DataTypes.STRING,
});

module.exports = Genre