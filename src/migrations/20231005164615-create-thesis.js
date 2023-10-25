"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("theses", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      status: { type: Sequelize.STRING },
      score: { type: Sequelize.FLOAT },
      result: { type: Sequelize.STRING },
      teacher: { type: Sequelize.JSONB },
      council: { type: Sequelize.JSONB },
      file: { type: Sequelize.JSONB },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("theses");
  },
};
