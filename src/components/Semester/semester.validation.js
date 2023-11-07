import Joi from "joi";

import { Validator } from "../../utils/validations.js";

const SemesterValidation = {
  createSemester: (body) => {
    const schema = Validator.object().keys({
      schoolYearId: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateSemester: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      schoolYearId: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteSemester: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default SemesterValidation;
