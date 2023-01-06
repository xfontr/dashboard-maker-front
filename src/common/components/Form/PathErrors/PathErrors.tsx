import Joi from "joi";

type FormErrorsProps = {
  errors?: Joi.ValidationErrorItem[];
  path: string;
};

const PathErrors = ({ errors, path }: FormErrorsProps) => (
  <>
    {errors?.length!! && (
      <ul data-testid="errors">
        {errors
          .filter((error) => error.path[0] === path)
          .map((error, index) => (
            <li key={`${path}${index}`}>{error.message}</li>
          ))}
      </ul>
    )}
  </>
);

export default PathErrors;
