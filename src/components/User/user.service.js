import pkg from "sequelize";

import { FacultyModel, MajorModel, UserModel } from "../../models/index.js";
import UserValidation from "./user.validation.js";

const { Op } = pkg;

const UserController = {
  getUserList: async (query) => {
    const { keyword = "", role, page = 0, limit = 10 } = query;
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

    if (role) {
      filter = {
        ...filter,
        role: {
          [Op.iLike]: role,
        },
      };
    }

    const data = await UserModel.findAndCountAll({
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

  createUser: async (body) => {
    const validate = UserValidation.createUser(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, role, facultyId, majorId } = body;

    const newUser = await UserModel.create({
      code,
      name,
      role,
      facultyId,
      majorId,
    });

    return newUser;
  },

  updateUser: async (id, body) => {
    const validate = UserValidation.updateUser({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, facultyId, majorId } = body;

    const findUser = await UserModel.findOne({
      where: {
        id,
      },
    });

    await findUser.update({
      code,
      name,
      facultyId,
      majorId,
    });

    return findUser;
  },

  deleteUser: async (id) => {
    const validate = UserValidation.deleteUser({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroyUser = await UserModel.destroy({
      where: {
        id,
      },
    });

    return destroyUser;
  },
};

export default UserController;
