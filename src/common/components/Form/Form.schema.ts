import Joi from "joi";
import { INPUT_RULES } from "./Form.constants";

const {
  email,
  password,
  name,
  standardLong,
  standardShort,
  phone,
  postalCode,
} = INPUT_RULES;

const formSchema = Joi.object({
  password: Joi.string().min(password.min).max(password.max).required(),

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
  code: Joi.string().min(password.min).max(password.max).allow(null, ""),
  street: Joi.string().min(standardLong.min).max(standardLong.max).required(),
  contactNumber: Joi.number().min(phone.min).max(phone.max).required(),
  extraNumber: Joi.number().min(phone.min).max(phone.max).required(),
  city: Joi.number().min(standardShort.min).max(standardShort.max).required(),
  postalCode: Joi.number().min(postalCode.min).max(postalCode.max).required(),
});

export default formSchema;
