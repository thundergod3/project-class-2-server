import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";

const OutlineModel = sequelize.define("outlines", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  code: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  file: { type: Sequelize.STRING },
});

export default OutlineModel;
