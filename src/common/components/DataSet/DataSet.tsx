import DataUnit from "../../types/DataUnit";
import DataField from "./DataField/DataField";
import "./DataSet.scss";

type DataSetProps = {
  dataset: DataUnit[];
};

const DataSet = ({ dataset }: DataSetProps) => (
  <ul className="data-set">
    {dataset.map((data) => (
      <DataField {...data} key={data.heading} />
    ))}
  </ul>
);

export default DataSet;
