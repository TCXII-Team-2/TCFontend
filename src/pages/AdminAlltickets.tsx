import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Ticket {
  id: number;
  sujet: string;
  description: string;
  status?: string;
  user_id: number;
  user?: User;
}

export default function TicketsWithUserPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  // ================= FETCH TICKETS + USERS =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch tickets
        const ticketsRes = await fetch(
          "http://localhost:8000/api/v1/tickets/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!ticketsRes.ok) throw new Error("Failed to fetch tickets");
        const ticketsData: Ticket[] = await ticketsRes.json();

        // Fetch users
        const usersRes = await fetch("http://localhost:8000/api/v1/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!usersRes.ok) throw new Error("Failed to fetch users");
        const usersData: User[] = await usersRes.json();

        // Map user info to tickets
        const ticketsWithUsers = ticketsData.map((t) => ({
          ...t,
          user: usersData.find((u) => u.id === t.user_id),
          status:
            !t.status || t.status === "in_progress"
              ? "en_traitement"
              : t.status,
        }));

        setTickets(ticketsWithUsers);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= STATUS CONFIG =================
  const getStatusConfig = (status?: string) => {
    const normalizedStatus = status ?? "en_traitement";
    const configs: Record<string, { color: string; text: string }> = {
      en_traitement: { color: "bg-yellow-500", text: "En Traitement" },
      completed: { color: "bg-green-500", text: "Completed" },
      not_completed: { color: "bg-red-500", text: "Not Completed" },
    };
    return configs[normalizedStatus] || configs["en_traitement"];
  };

  // ================= FILTERED TICKETS =================
  const filteredTickets = tickets.filter((ticket) => {
    const ticketStatus = ticket.status ?? "en_traitement";
    const matchesStatus =
      filterStatus === "all" || ticketStatus === filterStatus;
    const matchesSearch =
      ticket.sujet?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user?.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    startIndex,
    startIndex + ticketsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const statusCounts = {
    all: tickets.length,
    en_traitement: tickets.filter((t) => t.status === "en_traitement").length,
    completed: tickets.filter((t) => t.status === "completed").length,
    not_completed: tickets.filter((t) => t.status === "not_completed").length,
  };

  // ================= LOADING / ERROR =================
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading tickets...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">All Tickets</h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by subject, description, or user..."
            className="w-full pl-12 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap mb-6">
          {[
            { key: "all", label: "All", count: statusCounts.all },
            {
              key: "en_traitement",
              label: "En Traitement",
              count: statusCounts.en_traitement,
            },
            {
              key: "not_completed",
              label: "Not Completed",
              count: statusCounts.not_completed,
            },
            {
              key: "completed",
              label: "Completed",
              count: statusCounts.completed,
            },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setFilterStatus(f.key);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl ${
                filterStatus === f.key
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
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

                {/* User Info */}
                <div className="mt-4 border-t pt-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">
                      {ticket.user?.name || "Unknown User"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {ticket.user?.email || "-"}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full text-white bg-indigo-500">
                    {ticket.user?.role || "N/A"}
                  </span>
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
              No tickets found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
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
