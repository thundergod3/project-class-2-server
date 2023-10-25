import pkg from "sequelize";

import { OutlineModel } from "../../models/index.js";
import OutlineValidation from "./outline.validation.js";

const { Op } = pkg;

const OutlineService = {
  getOutlineList: async (query) => {
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

    const data = await OutlineModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });

    return {
      total: data.count,
      results: data.rows,
    };
  },

  createOutline: async (body) => {
    const validate = OutlineValidation.createOutline(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, file } = body;

    const newUser = await OutlineModel.create({
      code,
      name,
      file,
    });

    return newUser;
  },

  updateOutline: async (id, body) => {
    const validate = OutlineValidation.updateOutline({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, file } = body;

    const findOutline = await OutlineModel.findOne({
      where: {
        id,
      },
    });

    await findOutline.update({
      code,
      name,
      file,
    });

    return findOutline;
  },

  deleteOutline: async (id) => {
    const validate = OutlineValidation.deleteOutline({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroyUser = await OutlineModel.destroy({
      where: {
        id,
      },
    });

    return destroyUser;
  },
};

export default OutlineService;
