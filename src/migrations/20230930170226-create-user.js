"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
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
      },
      thesisId: {
        type: Sequelize.UUID,
      },
      schoolYearId: {
        type: Sequelize.UUID,
      },
      semesterId: {
        type: Sequelize.UUID,
      },
      code: { type: Sequelize.STRING, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.STRING, allowNull: false },
      username: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      topicId: { type: Sequelize.UUID },
      topic: { type: Sequelize.JSONB },
      fullName: { type: Sequelize.STRING },
      dob: { type: Sequelize.STRING },
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
    await queryInterface.dropTable("users");
  },
};
