import pkg from "sequelize";

import { FacultyModel, MajorModel, TeacherModel } from "../../models/index.js";
import TeacherValidation from "./teacher.validation.js";

const { Op } = pkg;

const TeacherController = {
  getTeacherList: async (query) => {
    const { keyword = "", page = 0, limit = 10 } = query;
    const offset = page * limit;
    let filter = {};

    if (keyword) {
      filter = {
        [Op.or]: [
          {
            code: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          { name: { [Op.like]: "%" + keyword + "%" } },
        ],
      };
    }

    const data = await TeacherModel.findAndCountAll({
      limit,
      offset,
      where: filter,
      include: [{ model: FacultyModel }, { model: MajorModel }],
      distinct: true,
    });

    return {
      total: data.count,
      results: data.rows,
    };
  },

  createTeacher: async (body) => {
    const validate = TeacherValidation.createTeacher(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, facultyId, majorId } = body;

    const newTeacher = await TeacherModel.create({
      code,
      name,
      facultyId,
      majorId,
    });

    return newTeacher;
  },

  updateTeacher: async (id, body) => {
    const validate = TeacherValidation.updateTeacher({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, facultyId, majorId } = body;

    const findTeacher = await TeacherModel.findOne({
      where: {
        id,
      },
    });

    await findTeacher.update({
      code,
      name,
      facultyId,
      majorId,
    });

    return findTeacher;
  },

  deleteTeacher: async (id) => {
    const validate = TeacherValidation.deleteTeacher({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroyTeacher = await TeacherModel.destroy({
      where: {
        id,
      },
    });

    return destroyTeacher;
  },
};

export default TeacherController;
