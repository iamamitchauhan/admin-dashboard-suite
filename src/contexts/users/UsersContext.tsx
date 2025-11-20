import { createContext, useContext, useReducer, ReactNode } from "react";
import { UsersState, initialUsersState } from "./usersState";
import { UsersAction } from "./usersActions";
import { usersReducer } from "./usersReducer";

interface UsersContextType {
  state: UsersState;
  dispatch: React.Dispatch<UsersAction>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(usersReducer, initialUsersState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within UsersProvider");
  }
  return context;
};
