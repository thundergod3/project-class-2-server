import Joi from "joi";
import { Validator } from "../../utils/validations.js";

const ReportThesisValidation = {
  createReportThesis: (body) => {
    const schema = Validator.object().keys({
      name: Joi.string().required(),
      userCode: Joi.string().required(),
    });

    return schema.validate(body);
  },

  updateReportThesis: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
    });

    return schema.validate(body);
  },

  deleteReportThesis: (body) => {
    const schema = Validator.object().keys({
      id: Joi.string().required(),
    });

    return schema.validate(body);
  },
};

export default ReportThesisValidation;
