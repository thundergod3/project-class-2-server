import pkg from "sequelize";

import {
  FacultyModel,
  MajorModel,
  SchoolYearModel,
  SemesterModel,
  UserModel,
} from "../../models/index.js";
import UserValidation from "./user.validation.js";
import AuthController from "../Auth/auth.service.js";

const { Op } = pkg;

const UserService = {
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
      include: [
        { model: FacultyModel },
        { model: MajorModel },
        { model: SchoolYearModel },
        { model: SemesterModel },
      ],
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

    const newUser = await AuthController.register({
      ...body,
      password: "12345678",
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

    const {
      fullName,
      username,
      code,
      name,
      facultyId,
      majorId,
      topicId,
      thesisId,
      topic,
      dob,
      schoolYearId,
      semesterId,
    } = body;

    const findUser = await UserModel.findOne({
      where: {
        id,
      },
    });

    await findUser.update({
      username,
      code,
      name,
      facultyId,
      majorId,
      fullName,
      topicId,
      thesisId,
      topic,
      dob,
      schoolYearId,
      semesterId,
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

export default UserService;
