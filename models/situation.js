const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Situation = sequelize.define('situation' ,{ // Nome da tabela no define
   situation: DataTypes.STRING,
});

module.exports = Situation