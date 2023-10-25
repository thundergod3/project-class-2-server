import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";

const ReportThesisModel = sequelize.define("report_theses", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: { type: Sequelize.UUID, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  file: { type: Sequelize.STRING },
});

export default ReportThesisModel;
