import { render, screen } from "@testing-library/react";
import DataUnit from "../../types/DataUnit";
import DataSet from "./DataSet";

describe("Given a DataSet component", () => {
  describe("When instantiated with a list of data units", () => {
    const dataset: DataUnit[] = [
      { heading: "Test", data: "Data test" },
      { heading: "Test", data: "Data test" },
    ];

    test("Then it should render one data field for each data unit", () => {
      render(<DataSet {...{ dataset }} />);

      const view = [
        ...screen.getAllByText(dataset[0].heading),
        ...screen.getAllByText(dataset[0].data!),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });
});
