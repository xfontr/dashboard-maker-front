import DataUnit from "../../../types/DataUnit";
import "./DataField.scss";

type DataProps = DataUnit;

const DataField = ({ heading, data }: DataProps): JSX.Element => (
  <li className="data-unit">
    <span className="data-unit__heading">{heading}</span>
    <span className="data-unit__content">{data || "-"}</span>
  </li>
);

export default DataField;
