import { UserItem } from "./usersState";

export enum UsersActionTypes {
  FETCH_USERS_START = "FETCH_USERS_START",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE",
  SELECT_USER = "SELECT_USER",
  CLEAR_SELECTED_USER = "CLEAR_SELECTED_USER",
  ADD_USER = "ADD_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
  SET_FILTER = "SET_FILTER",
  SET_SEARCH = "SET_SEARCH",
}

export type UsersAction =
  | { type: UsersActionTypes.FETCH_USERS_START }
  | { type: UsersActionTypes.FETCH_USERS_SUCCESS; payload: UserItem[] }
  | { type: UsersActionTypes.FETCH_USERS_FAILURE; payload: string }
  | { type: UsersActionTypes.SELECT_USER; payload: UserItem }
  | { type: UsersActionTypes.CLEAR_SELECTED_USER }
  | { type: UsersActionTypes.ADD_USER; payload: UserItem }
  | { type: UsersActionTypes.UPDATE_USER; payload: { id: string; data: Partial<UserItem> } }
  | { type: UsersActionTypes.DELETE_USER; payload: string }
  | { type: UsersActionTypes.SET_FILTER; payload: string }
  | { type: UsersActionTypes.SET_SEARCH; payload: string };
