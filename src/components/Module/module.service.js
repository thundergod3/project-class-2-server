import pkg from "sequelize";

import { FacultyModel, MajorModel, ModuleModel } from "../../models/index.js";
import ModuleValidation from "./module.validation.js";

const { Op } = pkg;

const ModuleController = {
  getModuleList: async (query) => {
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

    const data = await ModuleModel.findAndCountAll({
      limit,
      offset,
      where: keyword,
      include: [{ model: FacultyModel }, { model: MajorModel }],
      distinct: true,
    });

    return {
      total: data.count,
      results: data.rows,
    };
  },

  createModule: async (body) => {
    const validate = ModuleValidation.createModule(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, facultyId, majorId, teacherId } = body;

    const newModule = await ModuleModel.create({
      code,
      name,
      facultyId,
      majorId,
      teacherId,
    });

    return newModule;
  },

  updateModule: async (id, body) => {
    const validate = ModuleValidation.updateModule({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, facultyId, majorId, teacherId } = body;

    const findModule = await ModuleModel.findOne({
      where: {
        id,
      },
    });

    await findModule.update({
      code,
      name,
      facultyId,
      majorId,
      teacherId,
    });

    return findModule;
  },

  deleteModule: async (id) => {
    const validate = ModuleValidation.deleteModule({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroyModule = await ModuleModel.destroy({
      where: {
        id,
      },
    });

    return destroyModule;
  },
};

export default ModuleController;
