import UserRoles from "../../../common/types/UserRoles";

export type UserRequiredData = {
  id?: string;
  password: string;
  email: string;
  role?: UserRoles;
};

export type UserName = Partial<{
  name: string;
  surname: string;
  username: string;
}>;

export type UserAddress = Partial<{
  city: string;
  postalCode: string;
  street: string;
  stairs: string;
  block: string;
  addressExtraInfo: string;
}>;

interface IUser extends UserRequiredData, UserName, UserAddress {}

export default IUser;
