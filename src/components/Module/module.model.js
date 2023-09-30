import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";

const ModuleModel = sequelize.define("modules", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  facultyId: { type: Sequelize.UUID, allowNull: false },
  majorId: { type: Sequelize.UUID, allowNull: false },
  userId: { type: Sequelize.UUID, allowNull: true },
  code: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
});

export default ModuleModel;
