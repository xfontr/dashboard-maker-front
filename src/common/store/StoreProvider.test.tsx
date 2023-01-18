import { render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Store } from "./StoreProvider";

jest.mock("./index", () => ({
  reducer: {
    ui: {
      Context: {
        Provider: ({ children }: PropsWithChildren) => (
          <div data-testid="mockProvider">{children}</div>
        ),
      },
    },
  },
}));

describe("Given a Store component", () => {
  describe("When instantiated with the app store and children components", () => {
    test("Then it should return a list of store providers and the children in them", () => {
      const children = "Test";

      render(<Store>{children}</Store>);

      const view = screen.getByText(children);

      expect(view).toBeInTheDocument();

      const providers = screen.getAllByTestId("mockProvider");

      expect(providers).toHaveLength(1);
    });
  });
});
