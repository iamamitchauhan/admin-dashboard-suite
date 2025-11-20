import { User } from "./authState";

export enum AuthActionTypes {
  LOGIN_START = "LOGIN_START",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
  UPDATE_USER = "UPDATE_USER",
}

export type AuthAction =
  | { type: AuthActionTypes.LOGIN_START }
  | { type: AuthActionTypes.LOGIN_SUCCESS; payload: User }
  | { type: AuthActionTypes.LOGIN_FAILURE; payload: string }
  | { type: AuthActionTypes.LOGOUT }
  | { type: AuthActionTypes.UPDATE_USER; payload: Partial<User> };
