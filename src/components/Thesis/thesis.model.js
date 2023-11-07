import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";

const ThesisModel = sequelize.define("theses", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: { type: Sequelize.UUID, allowNull: false },
  schoolYearId: { type: Sequelize.UUID },
  status: { type: Sequelize.STRING },
  score: { type: Sequelize.FLOAT },
  result: { type: Sequelize.STRING },
  teacher: { type: Sequelize.JSONB },
  council: { type: Sequelize.JSONB },
  file: { type: Sequelize.STRING },
});

export default ThesisModel;
