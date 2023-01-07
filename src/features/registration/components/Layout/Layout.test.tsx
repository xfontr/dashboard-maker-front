import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Given a Layout component", () => {
  describe("When instantiated with a child 'Test'", () => {
    test("Then it should render said child and the company logo", () => {
      const child = "Test";

      render(<Layout>{child}</Layout>);

      const view = [
        screen.getByText(child),
        screen.getByAltText("Company logo"),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });
});
