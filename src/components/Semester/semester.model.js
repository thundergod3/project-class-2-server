import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";

const SemesterModel = sequelize.define("semesters", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  schoolYearId: {
    type: Sequelize.UUID,
  },
  name: { type: Sequelize.STRING, allowNull: false },
});

export default SemesterModel;
