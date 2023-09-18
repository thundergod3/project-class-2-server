import { Sequelize } from "sequelize";

import sequelize from "../../configs/sequelize.js";
import MajorModel from "../Major/major.model.js";
import TeacherModel from "../Teacher/teacher.model.js";
import ModuleModel from "../Module/module.model.js";

const FacultyModel = sequelize.define("faculties", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  code: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
});

export default FacultyModel;
