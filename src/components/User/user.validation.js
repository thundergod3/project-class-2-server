import Joi from "joi";
import { Validator } from "../../utils/validations.js";

const UserValidation = {
  createUser: (body) => {
    const schema = Validator.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      role: Joi.string().required(),
      facultyId: Joi.string().required(),
      majorId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateUser: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      code: Joi.string().required(),
      name: Joi.string().required(),
      facultyId: Joi.string().required(),
      majorId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteUser: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default UserValidation;
