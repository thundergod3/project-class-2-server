import pkg from "sequelize";

import {
  FacultyModel,
  MajorModel,
  SchoolYearModel,
  TopicModel,
  UserModel,
} from "../../models/index.js";
import TopicValidation from "./topic.validation.js";
import UserService from "../User/user.service.js";

const { Op } = pkg;

const TopicService = {
  getTopicList: async (query) => {
    const { keyword = "", status, userId, page = 0, limit = 10 } = query;
    const offset = page * limit;
    let filter = {
      status: {
        [Op.eq]: null,
      },
    };

    if (keyword) {
      filter = {
        ...filter,
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

    if (status) {
      filter = {
        ...filter,
        status: {
          [Op.iLike]: status,
        },
      };
    }

    if (userId) {
      filter = {
        ...filter,
        userId: {
          [Op.eq]: userId,
        },
      };
    }

    const data = await TopicModel.findAndCountAll({
      limit,
      offset,
      where: filter,
      include: [
        { model: FacultyModel },
        { model: MajorModel },
        { model: UserModel },
        { model: SchoolYearModel },
      ],
      distinct: true,
    });

    return {
      total: data.count,
      results: data.rows,
    };
  },

  createTopic: async (body) => {
    const validate = TopicValidation.createTopic(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, requirement, facultyId, majorId, schoolYearId } = body;

    const newTopic = await TopicModel.create({
      code,
      name,
      requirement,
      facultyId,
      majorId,
      userId: body?.userId,
      schoolYearId,
    });

    return newTopic;
  },

  updateTopic: async (id, body) => {
    const validate = TopicValidation.updateTopic({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, requirement, facultyId, majorId, schoolYearId } = body;

    const findTopic = await TopicModel.findOne({
      where: {
        id,
      },
    });

    await findTopic.update({
      code,
      name,
      requirement,
      facultyId,
      majorId,
      schoolYearId,
    });

    return findTopic;
  },

  deleteTopic: async (id) => {
    const validate = TopicValidation.deleteTopic({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroyTopic = await TopicModel.destroy({
      where: {
        id,
      },
    });

    return destroyTopic;
  },

  registerTopic: async (id, userId) => {
    const validate = TopicValidation.registerTopic({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const findTopic = await TopicModel.findOne({
      where: {
        id,
      },
    });

    await findTopic.update({
      registerId: userId,
    });
    await UserService.updateUser(userId, {
      topicId: id,
      topic: findTopic,
    });

    return findTopic;
  },

  unRegisterTopic: async (id, userId) => {
    const validate = TopicValidation.unRegisterTopic({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const findTopic = await TopicModel.findOne({
      where: {
        id,
      },
    });

    await findTopic.update({
      registerId: null,
    });
    await UserService.updateUser(userId, {
      topicId: null,
    });

    return findTopic;
  },

  proposalTopic: async (body, userId) => {
    const validate = TopicValidation.proposalTopic(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, reason, facultyId, majorId, schoolYearId } = body;

    const findTopic = await TopicModel.findOne({
      where: {
        code,
      },
    });

    if (findTopic) {
      return {
        msg: "Đề tài KLTN đã tồn tại!",
      };
    }

    const newTopic = await TopicModel.create({
      code,
      name,
      reason,
      facultyId,
      majorId,
      userId,
      status: "draft",
      schoolYearId,
    });

    return newTopic;
  },

  approveProposalTopic: async (id, body) => {
    const validate = TopicValidation.approveProposalTopic(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const findTopic = await TopicModel.findOne({
      where: {
        id,
      },
    });

    await findTopic.update({
      status: null,
    });

    return findTopic;
  },
};

export default TopicService;
