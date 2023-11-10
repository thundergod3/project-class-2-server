import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";
import hashPassword from "../../utils/hashPassword.js";

const UserModel = sequelize.define("users", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  facultyId: { type: Sequelize.UUID },
  majorId: { type: Sequelize.UUID },
  topicId: { type: Sequelize.UUID },
  topic: { type: Sequelize.JSONB },
  thesisId: { type: Sequelize.UUID },
  schoolYearId: { type: Sequelize.UUID },
  semesterId: { type: Sequelize.UUID },
  code: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.STRING, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  fullName: { type: Sequelize.STRING },
  dob: { type: Sequelize.DATE },
});

UserModel.beforeCreate((user) => {
  const hashedPassword = hashPassword(user.password);
  user.password = hashedPassword;
});

export default UserModel;
