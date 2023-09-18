import Joi from "joi";
import { Validator } from "../../utils/validations.js";

const TeacherValidation = {
  createTeacher: (body) => {
    const schema = Validator.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      facultyId: Joi.string().required(),
      majorId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateTeacher: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      code: Joi.string().required(),
      name: Joi.string().required(),
      facultyId: Joi.string().required(),
      majorId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteTeacher: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default TeacherValidation;
