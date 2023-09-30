import Joi from "joi";
import { Validator } from "../../utils/validations.js";

const TopicValidation = {
  createTopic: (body) => {
    const schema = Validator.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      requirement: Joi.string().required(),
      facultyId: Joi.string().required(),
      majorId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateTopic: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      code: Joi.string().required(),
      name: Joi.string().required(),
      requirement: Joi.string().required(),
      facultyId: Joi.string().required(),
      majorId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteTopic: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default TopicValidation;