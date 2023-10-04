import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";

const ResetTokenModel = sequelize.define("reset_tokens", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: { type: Sequelize.UUID, allowNull: false },
  token: { type: Sequelize.STRING, allowNull: false },
});

export default ResetTokenModel;
