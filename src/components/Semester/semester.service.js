import pkg from "sequelize";

import { SchoolYearModel, SemesterModel } from "../../models/index.js";
import SemesterValidation from "./semester.validation.js";

const { Op } = pkg;

const SemesterService = {
  getSemesterList: async (query) => {
    const { keyword = "", page = 0, limit = 10 } = query;
    const offset = page * limit;
    let filter = {};

    if (keyword) {
      filter = {
        [Op.or]: [{ name: { [Op.like]: "%" + keyword + "%" } }],
      };
    }

    const data = await SemesterModel.findAndCountAll({
      limit,
      offset,
      where: filter,
      include: [{ model: SchoolYearModel }],
      distinct: true,
    });

    return {
      total: data.count,
      results: data.rows,
    };
  },

  createSemester: async (body) => {
    const validate = SemesterValidation.createSemester(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { name, schoolYearId } = body;

    const newSemester = await SemesterModel.create({
      name,
      schoolYearId,
    });

    return newSemester;
  },

  updateSemester: async (id, body) => {
    const validate = SemesterValidation.updateSemester({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { name, schoolYearId } = body;

    const findSemester = await SemesterModel.findOne({
      where: {
        id,
      },
    });

    await findSemester.update({
      name,
      schoolYearId,
    });

    return findSemester;
  },

  deleteSemester: async (id) => {
    const validate = SemesterValidation.deleteSemester({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroySemester = await SemesterModel.destroy({
      where: {
        id,
      },
    });

    return destroySemester;
  },
};

export default SemesterService;
