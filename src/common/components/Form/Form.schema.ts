import Joi from "joi";
import INPUT_RULES from "../../../config/inputRules";

const { email, password, name } = INPUT_RULES;

const formSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]/)
    .min(password.min)
    .max(password.max)
    .required(),

  repeatPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Repeat password")
    .messages({ "any.only": "Passwords don't match" }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .min(email.min)
    .max(email.max)
    .required(),

  name: Joi.string().min(name.min).max(name.max).required(),
  surname: Joi.string().min(name.min).max(name.max).required(),
  code: Joi.string().min(password.min).max(password.max).required(),
});

export default formSchema;
