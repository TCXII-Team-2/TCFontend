import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AgentSidebar from "../sidebars/AgentSidebar";

export default function AgentLayout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <AgentSidebar />
        <main className="ml-64 w-full p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}
