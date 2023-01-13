import { SelectHTMLAttributes } from "react";
import setProps from "../../utils/setProps";
import "./Select.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const Select = ({ options, ...rest }: SelectProps): JSX.Element => (
  <select {...setProps(rest, "className", "select")}>
    {options.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Select;
