import jwt_decode from "jwt-decode";
import { DecodedToken } from "../types/token.types";

const decodeToken = (token: string): DecodedToken => jwt_decode(token);

export default decodeToken;
