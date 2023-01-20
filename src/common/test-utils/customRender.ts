import {
  render as ReactRender,
  renderHook as ReactRenderHook,
  RenderHookOptions,
  RenderOptions,
} from "@testing-library/react";
import { JSXElementConstructor, ReactElement } from "react";
import Wrapper from "./Wrapper";

export const render = (
  view: ReactElement<unknown, string | JSXElementConstructor<unknown>>,
  options?: RenderOptions
) => {
  ReactRender(view, { wrapper: Wrapper, ...options });
};

export const renderHook = <T>(
  hook: () => T,
  ...options: RenderHookOptions<unknown>[]
) => ReactRenderHook(hook, { wrapper: Wrapper, ...options });
