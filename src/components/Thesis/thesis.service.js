import pkg from "sequelize";

import {
  FacultyModel,
  ThesisModel,
  TopicModel,
  UserModel,
} from "../../models/index.js";
import ThesisValidation from "./thesis.validation.js";
import UserService from "../User/user.service.js";

const { Op } = pkg;

const ThesisService = {
  getThesisList: async (query) => {
    const { keyword = "", status, page = 0, limit = 10 } = query;
    const offset = page * limit;
    let filter = {};

    if (keyword) {
      filter = {
        ...filter,
        [Op.or]: [
          {
            code: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            topic: {
              name: {
                [Op.like]: "%" + keyword + "%",
              },
            },
          },
        ],
      };
    }

    if (status) {
      filter = {
        ...filter,
        status: {
          [Op.iLike]: status,
        },
      };
    }

    const data = await ThesisModel.findAndCountAll({
      limit,
      offset,
      include: [
        {
          where: filter,
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
      results: data.rows?.filter((record) => record?.user?.role !== "admin"),
    };
  },

  getThesisDetail: async (id) => {
    const validate = ThesisValidation.getThesisDetail({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const findThesis = await ThesisModel.findOne({
      where: {
        id,
      },
    });

    return findThesis;
  },

  createThesis: async (body) => {
    const validate = ThesisValidation.createThesis(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { userId, fullName, dob, file, status, schoolYearId } = body;

    const newThesis = await ThesisModel.create({
      userId,
      status,
    });

    await UserService.updateUser(body?.userId, {
      fullName,
      dob,
      thesisId: newThesis.id,
      file,
      schoolYearId,
    });

    return newThesis;
  },

  updateThesis: async (id, body) => {
    const validate = ThesisValidation.updateThesis({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { score, result, userId, fullName, dob, file, schoolYearId } = body;

    const findThesis = await ThesisModel.findOne({
      where: {
        id,
      },
    });

    await findThesis.update({
      score,
      result,
      file,
    });

    await UserService.updateUser(userId, {
      fullName,
      dob,
      file,
      schoolYearId,
    });

    return findThesis;
  },

  deleteThesis: async (id, body) => {
    const validate = ThesisValidation.deleteThesis({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { userId } = body;

    const destroyThesis = await ThesisModel.destroy({
      where: {
        id,
      },
    });

    await UserService.updateUser(userId, {
      thesisId: null,
    });

    return destroyThesis;
  },

  approveThesis: async (id, body) => {
    const validate = ThesisValidation.approveThesis({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { userId } = body;

    await UserService.updateUser(userId, {
      thesisId: id,
    });

    const findThesis = await ThesisModel.findOne({
      where: {
        id,
      },
    });

    await findThesis.update({
      status: "approve",
    });

    return findThesis;
  },

  createFinishThesis: async (body) => {
    const validate = ThesisValidation.createFinishThesis(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { userCode, score, result, file } = body;

    const user = await UserModel.findOne({
      where: {
        code: userCode,
      },
    });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const newThesis = await ThesisModel.create({
      userId: user?.id,
      status: "finish",
      score,
      result,
      file,
    });

    await UserService.updateUser(user?.id, {
      thesisId: newThesis.id,
    });

    return newThesis;
  },

  assignReviewTeacher: async (id, body) => {
    const validate = ThesisValidation.assignReviewTeacher({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { teacherId } = body;

    const user = await UserModel.findOne({
      where: {
        id: teacherId,
      },
    });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const findThesis = await ThesisModel.findOne({
      where: {
        id,
      },
    });

    await findThesis.update({
      teacher: user,
    });

    return findThesis;
  },

  updateCouncil: async (id, body) => {
    const validate = ThesisValidation.updateCouncil({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { council } = body;

    const findThesis = await ThesisModel.findOne({
      where: {
        id,
      },
    });

    await findThesis.update({
      council,
    });

    return findThesis;
  },
};

export default ThesisService;
