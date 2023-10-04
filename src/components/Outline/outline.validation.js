import Joi from "joi";
import { Validator } from "../../utils/validations.js";

const OutlineValidation = {
  createOutline: (body) => {
    const schema = Validator.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateOutline: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      code: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteOutline: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default OutlineValidation;
