"use client";

import Link from "next/link";
import {
  BarChart3,
  ClipboardCheck,
  CreditCard,
  FileText,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

const viewItems = [
  {
    title: "Debit",
    icon: TrendingDown,
    url: "/debit",
  },
  {
    title: "Credit",
    icon: TrendingUp,
    url: "/credit",
  },
];

const manageItems = [
  {
    title: "Create Checklist",
    icon: ClipboardCheck,
    url: "/create-checklist",
  },
  {
    title: "Checklists",
    icon: Users,
    url: "/checklists",
  },
];

const analyticsItems = [
  {
    title: "Overview",
    icon: BarChart3,
    url: "/analytics",
  },
  {
    title: "Reports",
    icon: FileText,
    url: "/analytics/reports",
  },
];

function SidebarSection({
  label,
  items,
  pathname
}: {
  label: string;
  items: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    url: string;
  }[];
  pathname: string;
}) {

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
        {label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathname === item.url ||
              pathname.startsWith(`${item.url}/`);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={[
                    "relative h-9 cursor-pointer rounded-md transition-colors",
                    "text-sidebar-foreground/70",
                    "hover:bg-sidebar-accent/70 hover:text-sidebar-foreground",
                    isActive && [
                      "bg-sidebar-accent",
                      "text-sidebar-accent-foreground",
                      "font-medium",
                      "hover:bg-sidebar-accent",
                    ],
                  ]
                    .flat()
                    .filter(Boolean)
                    .join(" ")}
                  render={
                    <Link href={item.url}>
                      <item.icon
                        className={[
                          "h-4 w-4 transition-colors",
                          isActive
                            ? "text-sidebar-primary"
                            : "text-sidebar-foreground/60",
                        ].join(" ")}
                      />

                      <span>{item.title}</span>

                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sidebar-primary" />
                      )}
                    </Link>
                  }
                />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="overflow-hidden border-r border-sidebar-border">
      {/* Top-right purple reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-300/25 blur-3xl"
      />

      {/* Header */}
      <SidebarHeader className="relative z-10 h-14 border-b border-sidebar-border px-5">
        <div className="flex h-full items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center">
            <CreditCard className="h-5 w-5 text-sidebar-primary" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-sidebar-foreground">
              Campus Coin
            </h2>

            <p className="truncate text-[11px] text-sidebar-foreground/50">
              Student Expense Management
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="relative z-10 gap-1 px-2 py-3">
        <SidebarSection
          label="View"
          items={viewItems}
          pathname={pathname}
        />

        <SidebarSection
          label="Manage"
          items={manageItems}
          pathname={pathname}
        />

        <SidebarSection
          label="Analytics"
          items={analyticsItems}
          pathname={pathname}
        />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="relative z-10 border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>WH</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-sidebar-foreground">
              Wasif Hussain
            </span>

            <span className="block truncate text-xs text-sidebar-foreground/50">
              Administrator
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}