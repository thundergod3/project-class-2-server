import pkg from "sequelize";

import { SchoolYearModel } from "../../models/index.js";
import SchoolYearValidation from "../SchoolYear/schoolYear.validation.js";

const { Op } = pkg;

const SchoolYearService = {
  getSchoolYearList: async (query) => {
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

    const data = await SchoolYearModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });

    return {
      total: data.count,
      results: data.rows,
    };
  },

  createSchoolYear: async (body) => {
    const validate = SchoolYearValidation.createSchoolYear(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name } = body;

    const newSchoolYear = await SchoolYearModel.create({
      code,
      name,
    });

    return newSchoolYear;
  },

  updateSchoolYear: async (id, body) => {
    const validate = SchoolYearValidation.updateSchoolYear({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name } = body;

    const findSchoolYear = await SchoolYearModel.findOne({
      where: {
        id,
      },
    });

    await findSchoolYear.update({
      code,
      name,
    });

    return findSchoolYear;
  },

  deleteSchoolYear: async (id) => {
    const validate = SchoolYearValidation.deleteSchoolYear({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroySchoolYear = await SchoolYearModel.destroy({
      where: {
        id,
      },
    });

    return destroySchoolYear;
  },
};

export default SchoolYearService;
