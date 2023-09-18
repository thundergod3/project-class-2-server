import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";

const TeacherModel = sequelize.define("teachers", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  facultyId: { type: Sequelize.UUID, allowNull: false },
  majorId: { type: Sequelize.UUID, allowNull: false },
  code: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
});

export default TeacherModel;
