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
      userId: Joi.string().required(),
      schoolYearId: Joi.string().required(),
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
      schoolYearId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteTopic: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },

  registerTopic: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },

  unRegisterTopic: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },

  proposalTopic: (body) => {
    const schema = Validator.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      reason: Joi.string().required(),
      majorId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  approveProposalTopic: (body) => {
    const schema = Validator.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      reason: Joi.string().required(),
      majorId: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default TopicValidation;
