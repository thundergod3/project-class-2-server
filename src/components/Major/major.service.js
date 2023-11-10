import pkg from "sequelize";

import { MajorModel } from "../../models/index.js";
import MajorValidation from "./major.validation.js";
import FacultyModel from "../Faculty/faculty.model.js";

const { Op } = pkg;

const MajorService = {
  getMajorList: async (query) => {
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

    const data = await MajorModel.findAndCountAll({
      limit,
      offset,
      where: filter,
      include: [{ model: FacultyModel }],
      distinct: true,
    });

    return {
      total: data.count,
      results: data.rows,
    };
  },

  createMajor: async (body) => {
    const validate = MajorValidation.createMajor(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, facultyId } = body;

    const findMajor = await MajorModel.findOne({
      where: {
        code,
      },
    });

    if (findMajor) {
      throw new Error("Mã ngành học đã tồn tại");
    }

    const newMajor = await MajorModel.create({
      code,
      name,
      facultyId,
    });

    return newMajor;
  },

  updateMajor: async (id, body) => {
    const validate = MajorValidation.updateMajor({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, facultyId } = body;

    const findMajor = await MajorModel.findOne({
      where: {
        id,
      },
    });
    const findExistMajor = await MajorModel.findOne({
      where: {
        code,
      },
    });

    if (findMajor.id !== findExistMajor.id) {
      throw new Error("Mã ngành học đã tồn tại");
    }

    await findMajor.update({
      code,
      name,
      facultyId,
    });

    return findMajor;
  },

  deleteMajor: async (id) => {
    const validate = MajorValidation.deleteMajor({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroyMajor = await MajorModel.destroy({
      where: {
        id,
      },
    });

    return destroyMajor;
  },
};

export default MajorService;
