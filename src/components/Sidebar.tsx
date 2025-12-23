import {
  LayoutDashboard,
  Ticket,
  Inbox,
  AlertCircle,
  CheckCircle,
  BarChart3,
} from "lucide-react";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white shadow-md fixed left-0 top-0 pt-16">
      <div className="px-4 py-6 space-y-2">
        {/* Dashboard */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => (window.location.href = "/agent/dashboard")}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Button>

        {/* Tickets */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => (window.location.href = "/agent/tickets")}
        >
          <Ticket className="h-5 w-5" />
          My Tickets
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => (window.location.href = "/agent/unread")}
        >
          <Inbox className="h-5 w-5" />
          Unread Replies
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => (window.location.href = "/agent/overdue")}
        >
          <AlertCircle className="h-5 w-5 text-red-500" />
          Overdue Tickets
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => (window.location.href = "/agent/resolved")}
        >
          <CheckCircle className="h-5 w-5 text-green-500" />
          Resolved
        </Button>

        <Separator className="my-4" />

        {/* Reports */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => (window.location.href = "/agent/reports")}
        >
          <BarChart3 className="h-5 w-5" />
          Reports
        </Button>
      </div>
    </aside>
  );
}
