import Joi from "joi";
import { Validator } from "../../utils/validations.js";

const ThesisValidation = {
  getThesisDetail: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },

  createThesis: (body) => {
    const schema = Validator.object().keys({
      userId: Joi.string().required(),
      fullName: Joi.string().required(),
      dob: Joi.string().required(),
      file: Joi.string().required(),
      status: Joi.string().required(),
      schoolYearId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateThesis: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteThesis: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      userId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  approveThesis: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      userId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  createFinishThesis: (body) => {
    const schema = Validator.object().keys({
      userCode: Joi.string().required(),
      result: Joi.string().required(),
      score: Joi.number().required(),
    });

    return schema.validate(body);
  },

  assignReviewTeacher: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      teacherId: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateCouncil: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default ThesisValidation;
