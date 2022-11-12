'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      situationId: {
        type: Sequelize.INTEGER,
        references: {model: "situations", key:"id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      book: {  
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateInit: {
        type: Sequelize.DATEONLY,
      },
      dateFinish: {
        type: Sequelize.DATEONLY,
      },
      rating:{
        type: Sequelize.FLOAT,
      },
      pages: {
        type: Sequelize.INTEGER,
      },
      comments: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: { 
        type: Sequelize.DATE,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  }
};
