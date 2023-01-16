import setProps from "../../../utils/setProps";
import Select from "../../Select/Select";
import { FormGroupProps } from "../Form.types";
import "./FormGroup.scss";

const FormGroup = ({
  label,
  inputProps,
  children,
  tooltip,
  ...rest
}: FormGroupProps) => (
  <div
    {...setProps(rest, "className", "form__group")}
    data-testid="form__group"
  >
    <div className="form__label-area">
      <label className="form__label" htmlFor={inputProps.id}>
        {label}
      </label>

      {tooltip && (
        <div className="form__tooltip" data-testid="tooltip">
          <i className="form__tooltip-icon">i</i>
          <span className="tooltip">{tooltip}</span>
        </div>
      )}
    </div>

    {!inputProps.renderas && (
      <input
        {...setProps(inputProps, "className", "form__input")}
        autoComplete="off"
      />
    )}

    {inputProps.renderas === "textarea" && (
      <textarea {...setProps(inputProps, "className", "form__input")} />
    )}

    {inputProps.renderas === "select" && (
      <Select
        options={inputProps.subprops ?? []}
        {...setProps(inputProps, "className", "form__input")}
      />
    )}

    {children}
  </div>
);

export default FormGroup;
