'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookGenres', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {model: "books", key:"id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: {model: "genres", key:"id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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
    await queryInterface.dropTable('bookGenres');
  }
};
