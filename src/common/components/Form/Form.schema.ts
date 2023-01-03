import Joi from "joi";
import INPUT_RULES from "../../../config/inputRules";

const { email, password } = INPUT_RULES;

const formSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]"))
    .min(password.min)
    .max(password.max)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .min(email.min)
    .max(email.max)
    .required(),
});

export default formSchema;
