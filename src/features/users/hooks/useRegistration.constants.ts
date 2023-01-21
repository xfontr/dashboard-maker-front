import { SideEffectsOptions } from "../../../common/store/slices/ui";

export const TOKEN_SIDE_EFFECTS: SideEffectsOptions = {
  successCondition: ["status", 200],
  loading: "Verifying token...",
  error: "Could not verify the token",
  success: "Token verified",
};

export const SIGN_UP_SIDE_EFFECTS: SideEffectsOptions = {
  successCondition: ["status", 201],
  loading: "Hold on, we are signing you up...",
  error: "It was not possible to complete the registration",
  success: "Registration completed",
};
