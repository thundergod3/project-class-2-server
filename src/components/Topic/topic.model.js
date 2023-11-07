import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";

const TopicModel = sequelize.define("topics", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  facultyId: { type: Sequelize.UUID },
  majorId: { type: Sequelize.UUID, allowNull: false },
  userId: { type: Sequelize.UUID, allowNull: false },
  schoolYearId: { type: Sequelize.UUID },
  registerId: { type: Sequelize.UUID },
  status: { type: Sequelize.STRING },
  reason: { type: Sequelize.STRING },
  code: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  requirement: { type: Sequelize.STRING },
});

export default TopicModel;
