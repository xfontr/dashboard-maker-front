import { SideEffectsOptions } from "../../../common/types/IQuery";
import IResponse from "../../../common/types/IResponse";
import { MAIN_IDENTIFIER } from "../../../config/database";

export const VERIFY_TOKEN_UI: SideEffectsOptions<IResponse<unknown>> = {
  successCondition: ["status", 200],
  loading: "Verifying token...",
  error: "Could not verify the token",
  success: "Token verified",
};

export const SIGN_USER_UP_UI: SideEffectsOptions<IResponse<unknown>> = {
  successCondition: ["status", 201],
  loading: "Hold on, we are signing you up...",
  error: "It was not possible to complete the registration",
  success: "Registration completed",
};

export const LOG_IN_UI: SideEffectsOptions<IResponse<unknown>> = {
  successCondition: ["status", 200],
  loading: "Hold on, we are logging you in...",
  error: `Please, verify your ${MAIN_IDENTIFIER} and password`,
};
