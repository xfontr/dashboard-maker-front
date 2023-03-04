import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tab from "./Tab/Tab";
import Tabs from "./Tabs";

describe("Given a Tabs component", () => {
  const firstTab = Tab("First tab", <>First tab content</>);
  const secondTab = Tab(
    "Second tab",
    <>Second tab content</>,
    "Second tab title"
  );

  describe("When instantiated with two different tabs", () => {
    test("Then it should render the first tab and both tab titles", () => {
      render(
        <Tabs>
          {firstTab}
          {secondTab}
        </Tabs>
      );

      const view = [
        screen.getByRole("button", { name: firstTab.name }),
        screen.getByRole("button", { name: secondTab.name }),
        screen.getByRole("heading", { name: firstTab.name }),
        screen.getByText("First tab content"),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });

    describe("And clicking the second tab", () => {
      test("Then it should unmount the first tab and render the second one", async () => {
        render(
          <Tabs>
            {firstTab}
            {secondTab}
          </Tabs>
        );

        const secondTabButton = screen.getByRole("button", {
          name: secondTab.name,
        });

        expect(secondTabButton).not.toHaveClass("button--active");

        await userEvent.click(secondTabButton);

        const firstTabContent = screen.queryByText("First tab content");
        expect(firstTabContent).not.toBeInTheDocument();

        const secondTabContent = screen.getByText("Second tab content");
        expect(secondTabContent).toBeInTheDocument();
        expect(secondTabButton).toHaveClass("button--active");
      });
    });
  });

  describe("When instantiated with a variant of 'border'", () => {
    test("Then it should render the tab content with a border", () => {
      render(
        <Tabs variant="border">
          {firstTab}
          {secondTab}
        </Tabs>
      );

      const tab = screen.getByTestId("tab__content");

      expect(tab).toHaveClass("tab tab--border");
    });
  });
});
