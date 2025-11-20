import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, UserX, Activity, RefreshCw } from "lucide-react";
import { toast } from "@/lib/toast";

export default function Dashboard() {
  const handleRefresh = () => {
    toast.info("Refreshing dashboard data...");
    setTimeout(() => {
      toast.success("Dashboard updated successfully!");
    }, 1500);
  };

  return (
    <DashboardLayout
      title="Dashboard"
      actions={
        <Button onClick={handleRefresh} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="2,847"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value="1,923"
          icon={UserCheck}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Pending Users"
          value="124"
          icon={Activity}
          trend={{ value: 3.1, isPositive: false }}
        />
        <StatCard
          title="Blocked Users"
          value="42"
          icon={UserX}
          trend={{ value: 15.3, isPositive: false }}
        />
      </div>

      {/* Additional Dashboard Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 pb-4 border-b border-border last:border-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">New user registered</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">View Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Activity className="h-6 w-6" />
              <span className="text-sm">Analytics</span>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
