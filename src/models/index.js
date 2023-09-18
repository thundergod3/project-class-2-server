import FacultyModel from "../components/Faculty/faculty.model.js";
import MajorModel from "../components/Major/major.model.js";
import ModuleModel from "../components/Module/module.model.js";
import TeacherModel from "../components/Teacher/teacher.model.js";

FacultyModel.hasMany(MajorModel, { foreignKey: "facultyId" });
FacultyModel.hasMany(TeacherModel, { foreignKey: "facultyId" });
FacultyModel.hasMany(ModuleModel, { foreignKey: "facultyId" });
MajorModel.hasMany(TeacherModel, { foreignKey: "majorId" });
MajorModel.hasMany(ModuleModel, { foreignKey: "majorId" });
TeacherModel.hasMany(ModuleModel, { foreignKey: "teacherId" });

MajorModel.belongsTo(FacultyModel);
TeacherModel.belongsTo(FacultyModel);
TeacherModel.belongsTo(MajorModel);
ModuleModel.belongsTo(FacultyModel);
ModuleModel.belongsTo(MajorModel);

export { FacultyModel, MajorModel, TeacherModel, ModuleModel };
