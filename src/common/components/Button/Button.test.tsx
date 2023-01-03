import { render, screen } from "@testing-library/react";
import Button, { AnimatedButton } from "./Button";
import userEvent from "@testing-library/user-event";

describe("Given a button component", () => {
  describe("When instantiated with a text 'Test' and a class 'test'", () => {
    test("Then it should display said text and have said class", () => {
      const text = "Test";

      const defaultClassName = "button";
      const className = "test";

      render(<Button {...{ className }}>{text}</Button>);

      const button = screen.getByText(text);

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(defaultClassName, className);
    });
  });
});

describe("Given a AnimatedButton component", () => {
  describe("When instantiated with a text 'Test' and an onClick action", () => {
    test("Then it should display said text and perform said action on click", async () => {
      const text = "Test";
      const onClick = jest.fn();

      const timesThatTheButtonTextWillBeRendered = 2;

      render(<AnimatedButton {...{ onClick }}>{text}</AnimatedButton>);

      const button = screen.getAllByText(text);

      await userEvent.click(button[0]);

      expect(button).toHaveLength(timesThatTheButtonTextWillBeRendered);
      expect(onClick).toHaveBeenCalled();
    });
  });
});
