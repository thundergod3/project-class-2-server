import pkg from "sequelize";

import { FacultyModel } from "../../models/index.js";
import FacultyValidation from "./faculty.validation.js";

const { Op } = pkg;

const FacultyService = {
  getFacultyList: async (query) => {
    const { keyword, page = 0, limit = 10 } = query;
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

    const data = await FacultyModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });

    return {
      total: data.count,
      results: data.rows,
    };
  },

  createFaculty: async (body) => {
    const validate = FacultyValidation.createFaculty(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name } = body;

    const findFaculty = await FacultyModel.findOne({
      where: {
        code,
      },
    });

    if (findFaculty) {
      throw new Error("Mã khoa đã tồn tại");
    }

    const newFaculty = await FacultyModel.create({
      code,
      name,
    });

    return newFaculty;
  },

  updateFaculty: async (id, body) => {
    const validate = FacultyValidation.updateFaculty({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name } = body;

    const findFaculty = await FacultyModel.findOne({
      where: {
        id,
      },
    });
    const findExistFaculty = await FacultyModel.findOne({
      where: {
        code,
      },
    });

    if (findExistFaculty) {
      throw new Error("Mã khoa đã tồn tại");
    }

    await findFaculty.update({
      code,
      name,
    });

    return findFaculty;
  },

  deleteFaculty: async (id) => {
    const validate = FacultyValidation.deleteFaculty({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroyFaculty = await FacultyModel.destroy({
      where: {
        id,
      },
    });

    return destroyFaculty;
  },
};

export default FacultyService;
