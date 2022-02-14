import jwtDecode from "jwt-decode";
import { ACCESS__TOKEN } from "../constants/routes";
import { TokenUser } from "../models/auth";
export const getIDUser = () : TokenUser | null => {
  if (localStorage.getItem(ACCESS__TOKEN) && typeof localStorage.getItem(ACCESS__TOKEN) === 'string') {
      const tokenToObject = localStorage.getItem(ACCESS__TOKEN)
    return jwtDecode(tokenToObject as string);
  } else {
    return null;
  }
};
