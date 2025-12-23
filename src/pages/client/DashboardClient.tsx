import { useLocation, useNavigate } from "react-router-dom";
import TicketFormModal from "../../components/ClientForm";

export default function DashboardClient() {
  const location = useLocation();
  const navigate = useNavigate();

  // Modal opens only on this route
  const isModalOpen = location.pathname === "/client/tickets/new";

  const handleCloseModal = () => {
    navigate("/client/tickets");
  };

  const handleSuccess = () => {
    // Optional: refresh ticket list, show toast, etc.
    console.log("Ticket created successfully");
    navigate("/client/tickets");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>

      <TicketFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
