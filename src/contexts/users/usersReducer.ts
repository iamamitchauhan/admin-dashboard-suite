import { UsersState } from "./usersState";
import { UsersAction, UsersActionTypes } from "./usersActions";

export const usersReducer = (state: UsersState, action: UsersAction): UsersState => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: null,
      };

    case UsersActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case UsersActionTypes.SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    case UsersActionTypes.CLEAR_SELECTED_USER:
      return {
        ...state,
        selectedUser: null,
      };

    case UsersActionTypes.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };

    case UsersActionTypes.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, ...action.payload.data }
            : user
        ),
        selectedUser:
          state.selectedUser?.id === action.payload.id
            ? { ...state.selectedUser, ...action.payload.data }
            : state.selectedUser,
      };

    case UsersActionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        selectedUser:
          state.selectedUser?.id === action.payload ? null : state.selectedUser,
      };

    case UsersActionTypes.SET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload,
        },
      };

    case UsersActionTypes.SET_SEARCH:
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload,
        },
      };

    default:
      return state;
  }
};
