import Joi from "joi";
import { Validator } from "../../utils/validations.js";

const FacultyValidation = {
  createFaculty: (body) => {
    const schema = Validator.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateFaculty: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      code: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteFaculty: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default FacultyValidation;
