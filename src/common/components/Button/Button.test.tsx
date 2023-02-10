import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as buttons from "./Button";

const baseClass = "button";

Object.entries(buttons).forEach(([buttonName, Button]) => {
  describe(`Given a ${buttonName} component`, () => {
    describe("When instantiated with a text 'Test', a class 'test' and a variant 'tiny'", () => {
      test("Then it should display said text and have said class", async () => {
        const text = "Test";
        const className = "test";
        const onClick = jest.fn();

        const view = render(
          <Button {...{ className, onClick }} variant="tiny">
            {text}
          </Button>
        );

        // We don't use the name option in case the button renders the text twice
        const button = screen.getByRole("button");

        // We take all texts because some buttons my render the text twice
        const buttonText = screen.getAllByText(text);

        await userEvent.click(button);

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass(baseClass, className, `${baseClass}--tiny`);
        expect(buttonText.length > 0).toBeTruthy();
        expect(onClick).toHaveBeenCalled();

        view.unmount();
      });
    });
  });
});
