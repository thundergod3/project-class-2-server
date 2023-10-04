import FacultyModel from "../components/Faculty/faculty.model.js";
import MajorModel from "../components/Major/major.model.js";
import ModuleModel from "../components/Module/module.model.js";
import UserModel from "../components/User/user.model.js";
import TopicModel from "../components/Topic/topic.model.js";
import DocumentModel from "../components/Document/document.model.js";
import OutlineModel from "../components/Outline/outline.model.js";
import ResetTokenModel from "../components/ResetToken/resetToken.model.js";

FacultyModel.hasMany(MajorModel, { foreignKey: "facultyId" });
FacultyModel.hasMany(UserModel, { foreignKey: "facultyId" });
FacultyModel.hasMany(ModuleModel, { foreignKey: "facultyId" });
FacultyModel.hasMany(TopicModel, { foreignKey: "facultyId" });
MajorModel.hasMany(UserModel, { foreignKey: "majorId" });
MajorModel.hasMany(ModuleModel, { foreignKey: "majorId" });
MajorModel.hasMany(TopicModel, { foreignKey: "majorId" });
UserModel.hasMany(TopicModel, { foreignKey: "userId" });

MajorModel.belongsTo(FacultyModel);
UserModel.belongsTo(FacultyModel);
UserModel.belongsTo(MajorModel);
ModuleModel.belongsTo(FacultyModel);
ModuleModel.belongsTo(MajorModel);
TopicModel.belongsTo(FacultyModel);
TopicModel.belongsTo(MajorModel);
TopicModel.belongsTo(UserModel);

export {
  FacultyModel,
  MajorModel,
  UserModel,
  ModuleModel,
  TopicModel,
  DocumentModel,
  OutlineModel,
  ResetTokenModel,
};
