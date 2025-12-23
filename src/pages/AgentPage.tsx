import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string; // admin, agent, client, user
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found in localStorage");

        const res = await fetch("http://localhost:8000/api/v1/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch users: ${res.status} - ${text}`);
        }

        const data: User[] = await res.json();
        // ================= FILTER ONLY AGENTS =================
        const onlyAgents = data.filter((user) => user.role === "agent");
        setAgents(onlyAgents);
      } catch (err: any) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // ================= FILTER + SEARCH =================
  const filteredAgents = agents.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredAgents.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredAgents.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading agents...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">Agents</h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search agents by name or email..."
            className="w-full pl-12 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Agents List */}
        <div className="space-y-4">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border relative"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <span className="px-3 py-1 text-xs rounded-full text-white bg-yellow-500">
                  Agent
                </span>
              </div>
              <p className="text-slate-600 mt-2">{user.email}</p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentUsers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={40} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              No agents found
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
