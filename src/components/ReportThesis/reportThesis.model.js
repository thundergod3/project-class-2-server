import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";

const ReportThesisModel = sequelize.define("report_thesis", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: { type: Sequelize.UUID, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
});

export default ReportThesisModel;
