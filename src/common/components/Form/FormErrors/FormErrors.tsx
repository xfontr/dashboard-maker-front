import Joi from "joi";

type FormErrorsProps = {
  errors?: Joi.ValidationErrorItem[];
};

const FormErrors = ({ errors }: FormErrorsProps) => (
  <>
    {errors?.length!! && (
      <ul className="errors" data-testid="errors">
        {errors.map((error) => (
          <li key={error.path[0]} className="errors__message">
            {error.message}
          </li>
        ))}
      </ul>
    )}
  </>
);

export default FormErrors;
