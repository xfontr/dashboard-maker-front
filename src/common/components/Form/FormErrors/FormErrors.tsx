import Joi from "joi";
import { curateErrorMessage } from "../Form.utils";

type FormErrorsProps = {
  errors?: Joi.ValidationErrorItem[];
};

const FormErrors = ({ errors }: FormErrorsProps) => (
  <>
    {errors?.length!! && (
      <ul className="errors" data-testid="errors">
        {errors.map((error, index) => (
          <li key={`${error.path[0]}${index}`} className="errors__message">
            {curateErrorMessage(error.message)}
          </li>
        ))}
      </ul>
    )}
  </>
);

export default FormErrors;
