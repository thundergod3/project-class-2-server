import Joi from "joi";
import { Validator } from "../../utils/validations.js";

const DocumentValidation = {
  createDocument: (body) => {
    const schema = Validator.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateDocument: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      code: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteDocument: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default DocumentValidation;
