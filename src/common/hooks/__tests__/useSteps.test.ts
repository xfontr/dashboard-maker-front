/* eslint-disable testing-library/no-unnecessary-act */
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useSteps from "../useSteps";

describe("Given a useSteps hook", () => {
  describe("When called with a initial step 3", () => {
    test("Then it should start to count from said number", () => {
      const initialStep = 3;

      const utils = renderHook(useSteps, { initialProps: initialStep });

      const {
        result: {
          current: { step },
        },
      } = utils;

      expect(step).toBe(initialStep);
    });
  });

  describe("When called its returned function next", () => {
    test("Then it should increase the step value by 1", () => {
      const utils = renderHook(useSteps);

      const {
        rerender,
        result: {
          current: { next },
        },
      } = utils;

      act(() => {
        next();
        rerender();
      });

      expect(utils.result.current.step).toBe(1);
    });
  });

  describe("When called its returned function previous", () => {
    test("Then it should decrease the step value by 1", () => {
      const utils = renderHook(useSteps, { initialProps: 1 });

      expect(utils.result.current.step).toBe(1);

      const {
        rerender,
        result: {
          current: { previous },
        },
      } = utils;

      act(() => {
        previous();
        rerender();
      });

      expect(utils.result.current.step).toBe(0);
    });

    test("Then it should keep the step at 0, if it would go any lower", () => {
      const utils = renderHook(useSteps);

      expect(utils.result.current.step).toBe(0);

      const {
        rerender,
        result: {
          current: { previous },
        },
      } = utils;

      act(() => {
        previous();
        rerender();
      });

      expect(utils.result.current.step).toBe(0);
    });
  });

  describe("When called its returned function restart", () => {
    test("Then it should reset the steps to their initial value (in this case, 0)", () => {
      const utils = renderHook(useSteps);
      const timesToStepForward = 3;

      expect(utils.result.current.step).toBe(0);

      const {
        rerender,
        result: {
          current: { restart, next },
        },
      } = utils;

      act(() => {
        Array(timesToStepForward).fill("").forEach(next);
        rerender();
      });

      expect(utils.result.current.step).toBe(3);

      act(() => {
        restart();
        rerender();
      });

      expect(utils.result.current.step).toBe(0);
    });
  });
});
