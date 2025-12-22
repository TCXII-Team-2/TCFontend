import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Inbox,
  Settings,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useNavigate } from "react-router-dom";

export default function ClientSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="h-screen w-64 bg-white shadow-md fixed left-0 top-0 pt-16">
      <div className="px-4 py-6 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/client/dashboard")}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/client/tickets")}
        >
          <Ticket className="h-5 w-5" />
          My Tickets
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/client/tickets/new")}
        >
          <PlusCircle className="h-5 w-5" />
          New Ticket
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/client/unread")}
        >
          <Inbox className="h-5 w-5" />
          Unread Responses
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
