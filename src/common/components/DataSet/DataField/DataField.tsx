import DataUnit from "../../../types/DataUnit";

type DataProps = DataUnit;

const DataField = ({ heading, data }: DataProps): JSX.Element => (
  <li className="data-unit">
    <h4 className="data-unit__heading">{heading}</h4>
    <span className="data-unit__content">{data ?? "-"}</span>
  </li>
);

export default DataField;
