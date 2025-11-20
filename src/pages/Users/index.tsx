import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreVertical } from "lucide-react";
import { CustomDrawer } from "@/components/ui/custom-drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/lib/toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "blocked";
  createdAt: string;
  lastLogin: string;
}

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active", createdAt: "2024-01-15", lastLogin: "2024-03-10" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "active", createdAt: "2024-02-20", lastLogin: "2024-03-09" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "User", status: "pending", createdAt: "2024-03-05", lastLogin: "Never" },
  { id: "4", name: "Sarah Williams", email: "sarah@example.com", role: "Moderator", status: "active", createdAt: "2024-01-28", lastLogin: "2024-03-08" },
  { id: "5", name: "Tom Brown", email: "tom@example.com", role: "User", status: "blocked", createdAt: "2024-02-14", lastLogin: "2024-02-20" },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      toast.success(`User ${userToDelete.name} deleted successfully!`);
      setUserToDelete(null);
      setSelectedUser(null);
    }
  };

  const handleEditUser = (user: User) => {
    toast.info(`Edit functionality for ${user.name} coming soon!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "blocked":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <DashboardLayout
      title="Users"
      actions={
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Add User
        </Button>
      }
    >
      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-input"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-muted-foreground">{user.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(user);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Drawer */}
      <CustomDrawer
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title={selectedUser?.name || ""}
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="text-foreground">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(selectedUser.status)}>
                  {selectedUser.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="text-foreground">{selectedUser.createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Login</p>
                <p className="text-foreground">{selectedUser.lastLogin}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-border space-y-3">
              <Button
                onClick={() => handleEditUser(selectedUser)}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Edit User
              </Button>
              <Button
                onClick={() => setUserToDelete(selectedUser)}
                variant="destructive"
                className="w-full"
              >
                Delete User
              </Button>
            </div>
          </div>
        )}
      </CustomDrawer>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account for{" "}
              <span className="font-semibold">{userToDelete?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive hover:bg-destructive/90"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
