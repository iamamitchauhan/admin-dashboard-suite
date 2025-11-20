import { ReactNode } from "react";
import { AuthProvider } from "./auth/AuthContext";
import { UsersProvider } from "./users/UsersContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <UsersProvider>
        {children}
      </UsersProvider>
    </AuthProvider>
  );
};
