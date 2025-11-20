export interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "Active" | "Pending" | "Blocked";
  createdAt: string;
  avatar?: string;
}

export interface UsersState {
  users: UserItem[];
  selectedUser: UserItem | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string;
    search: string;
  };
}

export const initialUsersState: UsersState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  filters: {
    status: "all",
    search: "",
  },
};
