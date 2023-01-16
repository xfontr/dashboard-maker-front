import UserRoles from "../../../common/types/UserRoles";
import { MAIN_IDENTIFIER } from "../../../config/database";

export type ProtoToken = {
  [MAIN_IDENTIFIER]: string;
  code: string;
};

export interface IToken extends ProtoToken {
  creationDate: Date;
  role: UserRoles;
  isCodeRequired: boolean;
}

export type TokenResponse = {
  token: IToken;
};
