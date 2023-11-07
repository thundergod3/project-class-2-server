import Joi from "joi";

import { Validator } from "../../utils/validations.js";

const SchoolYearValidation = {
  createSchoolYear: (body) => {
    const schema = Validator.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateSchoolYear: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      code: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteSchoolYear: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default SchoolYearValidation;
