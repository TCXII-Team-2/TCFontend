import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminSidebar from "../sidebars/AdminSidebar";

export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <AdminSidebar />
        <main className="ml-64 w-full p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}
