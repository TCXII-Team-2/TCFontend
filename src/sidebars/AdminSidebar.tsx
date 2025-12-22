import {
  LayoutDashboard,
  Users,
  UserCog,
  Ticket,
  BarChart3,
  Settings,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="h-screen w-64 bg-white shadow-md fixed left-0 top-0 pt-16">
      <div className="px-4 py-6 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/admin/dashboard")}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/admin/users")}
        >
          <Users className="h-5 w-5" />
          Users
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/admin/agents")}
        >
          <UserCog className="h-5 w-5" />
          Agents
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/admin/tickets")}
        >
          <Ticket className="h-5 w-5" />
          All Tickets
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/admin/reports")}
        >
          <BarChart3 className="h-5 w-5" />
          Reports
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
