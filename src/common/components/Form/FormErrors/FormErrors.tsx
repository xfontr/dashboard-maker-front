import Joi from "joi";

type FormErrorsProps = {
  errors?: Joi.ValidationErrorItem[];
};

const FormErrors = ({ errors }: FormErrorsProps) => (
  <>
    {errors && errors.length && (
      <ul className="errors" data-testid="errors">
        {errors.map((error, index) => (
          <li key={index} className="errors__message">
            {error.message}
          </li>
        ))}
      </ul>
    )}
  </>
);

export default FormErrors;
