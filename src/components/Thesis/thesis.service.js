import pkg from "sequelize";

import {
  FacultyModel,
  MajorModel,
  ThesisModel,
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
    let filterUser = {};

    if (keyword) {
      filterUser = {
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
        status: {
          [Op.iLike]: status,
        },
      };
    }

    const data = await ThesisModel.findAndCountAll({
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
            {
              model: MajorModel,
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

  getReportFinishThesisList: async (query) => {
    const { semesterId, schoolYearId } = query;
    let filterUser = {
      role: {
        [Op.iLike]: "student",
      },
    };
    let filterFinishThesis = {
      status: {
        [Op.iLike]: "finish",
      },
      result: {
        [Op.iLike]: "complete",
      },
    };

    if (semesterId) {
      filterUser = {
        ...filterUser,
        semesterId: {
          [Op.eq]: semesterId,
        },
      };
    }

    if (schoolYearId) {
      filterUser = {
        ...filterUser,
        schoolYearId: {
          [Op.eq]: schoolYearId,
        },
      };
    }

    const dataUsers = await UserModel.findAll({
      where: filterUser,
      include: [
        {
          model: MajorModel,
        },
      ],
      distinct: true,
    });
    const formatDataUsers = dataUsers.map((record) => ({
      majorId: record?.majorId,
      major: {
        name: record?.major?.name,
      },
    }));
    const dataThesis = await ThesisModel.findAll({
      where: filterFinishThesis,
      include: [
        {
          model: UserModel,
          where: filterUser,
          include: [
            {
              model: MajorModel,
            },
          ],
        },
      ],
      distinct: true,
    });
    const formatDataThesis = dataThesis.map((record) => ({
      status: "finish",
      majorId: record?.user?.majorId,
      major: {
        name: record?.user?.major?.name,
      },
    }));

    let formatData = [];

    [...formatDataUsers, ...formatDataThesis].forEach((record) => {
      let item = {
        majorId: record?.majorId,
        majorName: record?.major?.name,
        totalUser: 0,
        totalUserFinish: 0,
        percent: 0,
      };
      const findItemBaseMajor = formatData.find(
        (record) => record?.majorId === item?.majorId
      );

      if (findItemBaseMajor) {
        const findIndexItemBaseMajor = formatData.findIndex(
          (record) => record?.majorId === item?.majorId
        );

        if (record?.status === "finish") {
          formatData[findIndexItemBaseMajor].totalUserFinish =
            findItemBaseMajor.totalUserFinish + 1;
        } else {
          formatData[findIndexItemBaseMajor].totalUser =
            findItemBaseMajor.totalUser + 1;
        }
      } else {
        if (record?.status === "finish") {
          item.totalUserFinish += 1;
        } else {
          item.totalUser += 1;
        }

        formatData.push(item);
      }
    });

    formatData = formatData.map((record) => ({
      ...record,
      percent: (record?.totalUserFinish / record?.totalUser) * 100,
    }));

    return {
      results: formatData,
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

    const {
      score,
      result,
      userId,
      userCode,
      fullName,
      dob,
      file,
      schoolYearId,
    } = body;
    let formatUserId = "";

    if (userCode) {
      const user = await UserModel.findOne({
        where: {
          code: userCode,
        },
      });

      formatUserId = user.id;
    } else {
      formatUserId = userId;
    }

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

    await UserService.updateUser(formatUserId, {
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
