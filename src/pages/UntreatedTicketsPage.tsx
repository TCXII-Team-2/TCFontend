import { useEffect, useState } from "react";
import { User, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Ticket {
  id: number;
  sujet: string;
  description: string;
  user_id: string;
  status?: string; // status can be undefined
}

export default function EscalatedTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  // ================= FETCH TICKETS =================
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8000/api/v1/tickets/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tickets");

        const data: Ticket[] = await res.json();

        // ✅ Filter only tickets with status "escalated"
        const escalatedTickets = data.filter(
          (ticket) => ticket.status?.toLowerCase() === "escalated"
        );
        setTickets(escalatedTickets);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // ================= STATUS CONFIG =================
  const getStatusConfig = (status?: string) => {
    const normalizedStatus = status?.toLowerCase() || "escalated";

    const configs: Record<
      string,
      { color: string; text: string; dotColor: string }
    > = {
      escalated: {
        color: "bg-red-500",
        text: "Escalated",
        dotColor: "bg-red-400",
      },
    };

    return configs[normalizedStatus] || configs["escalated"];
  };

  // ================= FILTER =================
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.sujet?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const endIndex = startIndex + ticketsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= LOADING / ERROR =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Escalated Tickets
          </h1>

          {/* Search */}
          <div className="relative mb-6">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets by subject, description, or user ID..."
              className="w-full pl-12 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tickets */}
        <div className="space-y-4">
          {currentTickets.map((ticket) => {
            const status = getStatusConfig(ticket.status);
            return (
              <div
                key={ticket.id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border relative"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{ticket.sujet}</h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full text-white ${status.color}`}
                  >
                    {status.text}
                  </span>
                </div>
                <p className="text-slate-600 mt-2">{ticket.description}</p>
                <div className="flex items-center gap-2 mt-4">
                  <User size={16} />
                  <span className="font-semibold">{ticket.user_id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {currentTickets.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={40} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              No escalated tickets found
            </h3>
            <p className="text-slate-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={currentPage === p ? "font-bold" : ""}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
