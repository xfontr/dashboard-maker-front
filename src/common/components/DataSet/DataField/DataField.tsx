import DataUnit from "../../../types/DataUnit";

type DataProps = DataUnit;

const DataField = ({ heading, data }: DataProps): JSX.Element => (
  <li className="data-unit">
    <span className="data-unit__heading">{heading}</span>
    <span className="data-unit__content">{data || "-"}</span>
  </li>
);

export default DataField;
