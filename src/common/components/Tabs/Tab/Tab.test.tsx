/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import Tab, { tabDefaultName } from "./Tab";

describe("Given a Tab component", () => {
  describe("When instantiated with a name 'Profile' and 'Test' as children", () => {
    test("Then it should return an object with said name and with said children", () => {
      const children = "Test";
      const expectedResult: ReturnType<typeof Tab> = {
        name: "Profile",
        children: <>{children}</>,
      };

      const tab = Tab(expectedResult.name, expectedResult.children);

      render(
        <>
          {tab.children} {tab.name}
        </>
      );

      const view = [
        screen.getByRole("heading", { name: expectedResult.name }),
        screen.getByText(children),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });

  describe("When instantiated with a name 'Profile', 'Test' as children, and 'Title' as title", () => {
    test("Then it should return an object with said title and with said children", () => {
      const children = "Test";

      const expectedResult = {
        name: "Profile",
        children: <>{children}</>,
        title: "Title",
      };

      const tab = Tab(
        expectedResult.name,
        expectedResult.children,
        expectedResult.title
      );

      render(
        <>
          {tab.children} {tab.name}
        </>
      );

      const notView = screen.queryByRole("heading", {
        name: expectedResult.name,
      });

      expect(notView).not.toBeInTheDocument();
      expect(tab.name).toBe(expectedResult.name);

      const view = [
        screen.getByRole("heading", { name: expectedResult.title }),
        screen.getByText(children),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });

  describe("When instantiated with an empty name", () => {
    test("Then it should use a default name", () => {
      const tab = Tab("", <></>);

      expect(tab.name).toBe(tabDefaultName);
    });
  });
});
