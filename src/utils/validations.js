import Joi from "joi";

export const Validator = Joi.defaults((schema) => {
  return schema.options({
    allowUnknown: true,
    convert: true,
    presence: "optional",
  });
});
