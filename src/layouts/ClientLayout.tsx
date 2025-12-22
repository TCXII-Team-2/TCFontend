import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ClientSidebar from "../sidebars/ClientSidebar";

export default function ClientLayout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <ClientSidebar />
        <main className="ml-64 w-full p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}
