import Joi from "joi";
import { Validator } from "../../utils/validations.js";

const ModuleValidation = {
  createModule: (body) => {
    const schema = Validator.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      facultyId: Joi.string().required(),
      majorId: Joi.string().required(),
      teacherId: Joi.string(),
    });

    return schema.validate(body);
  },

  updateModule: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      code: Joi.string().required(),
      name: Joi.string().required(),
      facultyId: Joi.string().required(),
      majorId: Joi.string().required(),
      teacherId: Joi.string(),
    });

    return schema.validate(body);
  },

  deleteModule: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default ModuleValidation;
