import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
}

export function DashboardLayout({ children, title, actions }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        {title && (
          <header className="sticky top-0 z-30 h-16 bg-background border-b border-border flex items-center justify-between px-6">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </header>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
