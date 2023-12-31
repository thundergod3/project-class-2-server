"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("topics", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      facultyId: {
        type: Sequelize.UUID,
      },
      majorId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      registerId: {
        type: Sequelize.UUID,
      },
      schoolYearId: {
        type: Sequelize.UUID,
      },
      code: { type: Sequelize.STRING, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      requirement: { type: Sequelize.STRING },
      status: { type: Sequelize.STRING },
      reason: { type: Sequelize.STRING },
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
    await queryInterface.dropTable("topics");
  },
};
