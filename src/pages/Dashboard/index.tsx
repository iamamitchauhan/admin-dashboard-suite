import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { RefreshCw, Users, UserCheck, UserX, Clock } from "lucide-react";
import { toast } from "@/lib/toast";

export default function Dashboard() {
  const handleRefresh = () => {
    toast.info("Refreshing dashboard data...");
    setTimeout(() => {
      toast.success("Dashboard updated successfully!");
    }, 1000);
  };

  return (
    <DashboardLayout
      title="Dashboard"
      actions={
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      }
    >
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Users"
          value="2,543"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value="1,842"
          icon={UserCheck}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Pending Users"
          value="156"
          icon={Clock}
          trend={{ value: 3.1, isPositive: false }}
        />
        <StatCard
          title="Blocked Users"
          value="45"
          icon={UserX}
          trend={{ value: 1.4, isPositive: false }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <p className="text-sm font-medium text-foreground">New user registered</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <p className="text-sm font-medium text-foreground">User profile updated</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">User account blocked</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Add New User
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View Reports
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Manage Settings
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
