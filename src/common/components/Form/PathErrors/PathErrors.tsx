import Joi from "joi";
import { curateErrorMessage } from "../Form.utils";

type FormErrorsProps = {
  errors?: Joi.ValidationErrorItem[];
  path: string;
};

const PathErrors = ({ errors, path }: FormErrorsProps) => {
  const pathErrors =
    errors?.filter((error) => error.path[0] === path) ?? undefined;

  return pathErrors?.length ? (
    <ul className="errors" data-testid="errors">
      {pathErrors.map((error, index) => (
        <li
          key={`${path}${index}`}
          className="errors__message"
          data-testid={`error-${index}`}
        >
          {curateErrorMessage(error.message)}
        </li>
      ))}
    </ul>
  ) : (
    <></>
  );
};

export default PathErrors;
