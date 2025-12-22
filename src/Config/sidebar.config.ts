import {
  LayoutDashboard,
  Users,
  UserCog,
  Ticket,
  Inbox,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PlusCircle,
  Settings,
} from "lucide-react";

export const SIDEBAR_CONFIG = {
  ADMIN: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      label: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      label: "Agents",
      icon: UserCog,
      path: "/admin/agents",
    },
    {
      label: "Tickets",
      icon: Ticket,
      path: "/admin/tickets",
    },
    {
      label: "Reports",
      icon: BarChart3,
      path: "/admin/reports",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ],

  AGENT: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/agent/dashboard",
    },
    {
      label: "My Tickets",
      icon: Ticket,
      path: "/agent/tickets",
    },
    {
      label: "Unread Replies",
      icon: Inbox,
      path: "/agent/unread",
    },
    {
      label: "Overdue",
      icon: AlertCircle,
      path: "/agent/overdue",
    },
    {
      label: "Resolved",
      icon: CheckCircle,
      path: "/agent/resolved",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ],

  CLIENT: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/client/dashboard",
    },
    {
      label: "My Tickets",
      icon: Ticket,
      path: "/client/tickets",
    },
    {
      label: "New Ticket",
      icon: PlusCircle,
      path: "/client/tickets/new",
    },
    {
      label: "Unread Responses",
      icon: Inbox,
      path: "/client/unread",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ],
};
