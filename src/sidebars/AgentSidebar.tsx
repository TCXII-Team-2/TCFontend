import {
  LayoutDashboard,
  Ticket,
  Inbox,
  AlertCircle,
  CheckCircle,
  Settings,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useNavigate } from "react-router-dom";

export default function AgentSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="h-screen w-64 bg-white shadow-md fixed left-0 top-0 pt-16">
      <div className="px-4 py-6 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/agent/dashboard")}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/agent/tickets")}
        >
          <Ticket className="h-5 w-5" />
          My Tickets
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/agent/unread")}
        >
          <Inbox className="h-5 w-5" />
          Unread Replies
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/agent/overdue")}
        >
          <AlertCircle className="h-5 w-5 text-red-500" />
          Overdue
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/agent/resolved")}
        >
          <CheckCircle className="h-5 w-5 text-green-500" />
          Resolved
        </Button>

        <Separator className="my-4" />

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/settings")}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Button>
      </div>
    </aside>
  );
}
