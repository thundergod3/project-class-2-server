import pkg from "sequelize";

import { FacultyModel, MajorModel, TopicModel } from "../../models/index.js";
import TopicValidation from "./topic.validation.js";

const { Op } = pkg;

const TopicController = {
  getTopicList: async (query) => {
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

    const data = await TopicModel.findAndCountAll({
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

  createTopic: async (body) => {
    const validate = TopicValidation.createTopic(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, requirement, facultyId, majorId } = body;

    const newUser = await TopicModel.create({
      code,
      name,
      requirement,
      facultyId,
      majorId,
    });

    return newUser;
  },

  updateTopic: async (id, body) => {
    const validate = TopicValidation.updateTopic({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, requirement, facultyId, majorId } = body;

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

    const destroyUser = await TopicModel.destroy({
      where: {
        id,
      },
    });

    return destroyUser;
  },
};

export default TopicController;
