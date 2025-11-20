import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomDrawer } from "@/components/ui/custom-drawer";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, Trash2, Edit, UserPlus, Filter } from "lucide-react";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Blocked";
  createdAt: string;
  lastLogin: string;
  phone: string;
}

const mockUsers: User[] = [
  { id: "1", name: "John Lennon", email: "john@example.com", role: "Admin", status: "Active", createdAt: "2024-01-15", lastLogin: "2 hours ago", phone: "+1 234 567 8900" },
  { id: "2", name: "Sophia Martinez", email: "sophia@example.com", role: "User", status: "Active", createdAt: "2024-02-20", lastLogin: "1 day ago", phone: "+1 234 567 8901" },
  { id: "3", name: "Liam Chen", email: "liam@example.com", role: "User", status: "Pending", createdAt: "2024-03-10", lastLogin: "Never", phone: "+1 234 567 8902" },
  { id: "4", name: "Emma Wilson", email: "emma@example.com", role: "Moderator", status: "Active", createdAt: "2024-01-05", lastLogin: "5 minutes ago", phone: "+1 234 567 8903" },
  { id: "5", name: "Noah Brown", email: "noah@example.com", role: "User", status: "Blocked", createdAt: "2023-12-20", lastLogin: "2 weeks ago", phone: "+1 234 567 8904" },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      toast.success(`User ${userToDelete.name} deleted successfully`);
      setUserToDelete(null);
      setSelectedUser(null);
    }
  };

  const handleEditUser = () => {
    toast.info("Edit user functionality coming soon");
  };

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "Active": return "bg-success/10 text-success";
      case "Pending": return "bg-warning/10 text-warning";
      case "Blocked": return "bg-destructive/10 text-destructive";
    }
  };

  return (
    <DashboardLayout
      title="Users"
      actions={
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      }
    >
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Email</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Role</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Created</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <p className="text-muted-foreground">No users found</p>
                    <Button variant="outline" className="mt-4 gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add Your First User
                    </Button>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={cn(
                      "border-b border-border cursor-pointer hover:bg-secondary/50 transition-colors",
                      selectedUser?.id === user.id && "bg-secondary/50"
                    )}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-foreground">{user.name}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{user.email}</td>
                    <td className="py-4 px-6 text-sm text-foreground">{user.role}</td>
                    <td className="py-4 px-6">
                      <Badge className={cn("text-xs", getStatusColor(user.status))}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{user.createdAt}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Drawer */}
      <CustomDrawer
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* User Avatar & Basic Info */}
            <div className="text-center pb-6 border-b border-border">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">
                  {selectedUser.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">{selectedUser.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              <Badge className={cn("mt-2", getStatusColor(selectedUser.status))}>
                {selectedUser.status}
              </Badge>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">User ID</p>
                <p className="text-sm font-medium text-foreground">{selectedUser.id}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Phone</p>
                <p className="text-sm font-medium text-foreground">{selectedUser.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Role</p>
                <p className="text-sm font-medium text-foreground">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Created</p>
                <p className="text-sm font-medium text-foreground">{selectedUser.createdAt}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Last Login</p>
                <p className="text-sm font-medium text-foreground">{selectedUser.lastLogin}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-border space-y-3">
              <Button onClick={handleEditUser} className="w-full bg-primary hover:bg-primary/90 gap-2">
                <Edit className="h-4 w-4" />
                Edit User
              </Button>
              <Button
                onClick={() => setUserToDelete(selectedUser)}
                variant="destructive"
                className="w-full gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete User
              </Button>
            </div>
          </div>
        )}
      </CustomDrawer>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete this user?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action cannot be undone. User <span className="font-semibold text-foreground">{userToDelete?.name}</span> will be permanently removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary hover:bg-secondary/80">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
