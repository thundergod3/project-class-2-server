import pkg from "sequelize";

import {
  FacultyModel,
  ReportThesisModel,
  UserModel,
} from "../../models/index.js";
import ReportThesisValidation from "./reportThesis.validation.js";

const { Op } = pkg;

const ReportThesisService = {
  getReportThesisList: async (query) => {
    const { keyword = "", page = 0, limit = 10 } = query;
    const offset = page * limit;
    let filter = {};
    let filterUser = {};

    if (keyword) {
      filter = {
        [Op.or]: [{ name: { [Op.like]: "%" + keyword + "%" } }],
      };
      filterUser = {
        [Op.or]: [
          {
            code: {
              [Op.like]: "%" + keyword + "%",
            },
          },
        ],
      };
    }

    const data = await ReportThesisModel.findAndCountAll({
      limit,
      offset,
      where: filter,
      include: [
        {
          where: filterUser,
          model: UserModel,
          include: [
            {
              model: FacultyModel,
            },
          ],
        },
      ],
      distinct: true,
    });

    return {
      total: data.count,
      results: data.rows,
    };
  },

  createReportThesis: async (body) => {
    const validate = ReportThesisValidation.createReportThesis(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { name, userCode, file } = body;

    const user = await UserModel.findOne({
      where: {
        code: userCode,
      },
    });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const newReportThesis = await ReportThesisModel.create({
      name,
      userId: user?.id,
      file,
    });

    return newReportThesis;
  },

  updateReportThesis: async (id, body) => {
    const validate = ReportThesisValidation.updateReportThesis({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { name, file } = body;

    const findReportThesis = await ReportThesisModel.findOne({
      where: {
        id,
      },
    });

    await findReportThesis.update({
      name,
      file,
    });

    return findReportThesis;
  },

  deleteReportThesis: async (id) => {
    const validate = ReportThesisValidation.deleteReportThesis({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroyReportThesis = await ReportThesisModel.destroy({
      where: {
        id,
      },
    });

    return destroyReportThesis;
  },
};

export default ReportThesisService;
