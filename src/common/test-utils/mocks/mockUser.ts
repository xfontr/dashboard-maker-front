import { MAIN_IDENTIFIER } from "../../../config/database";
import IUser from "../../../features/users/types/user.types";

export const mockProtoUser: IUser = {
  name: "Name",
  [MAIN_IDENTIFIER]: "email@email.com",
  password: "password",
  role: "user",
};

export const mockUser: IUser = {
  name: "Name",
  [MAIN_IDENTIFIER]: "email@email.com",
  password: "password",
  role: "user",
  id: "id",
  street: "street",
  city: "city",
  state: "spain",
  authToken: "refreshAuthenticationToken",
};

export const mockUserSuperAdmin: IUser = { ...mockUser, role: "superAdmin" };
export const mockUserAdmin: IUser = { ...mockUser, role: "admin" };
