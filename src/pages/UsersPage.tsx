import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string; // admin, agent, client
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
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
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ================= ROLE CONFIG =================
  const getRoleConfig = (role: string) => {
    const configs: Record<string, { color: string; text: string }> = {
      admin: { color: "bg-red-500", text: "Admin" },
      agent: { color: "bg-yellow-500", text: "Agent" },
      client: { color: "bg-green-500", text: "Client" },
    };
    return configs[role] || { color: "bg-gray-500", text: role };
  };

  // ================= ROLE COUNTS =================
  const roleCounts = {
    all: users.length,
    admin: users.filter((u) => u.role === "admin").length,
    agent: users.filter((u) => u.role === "agent").length,
    client: users.filter((u) => u.role === "client").length,
  };

  // ================= FILTER USERS =================
  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
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
        <p className="text-lg font-semibold">Loading users...</p>
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
        {/* Header */}
        <h1 className="text-4xl font-bold text-slate-800 mb-6">Users</h1>

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
            placeholder="Search by name or email..."
            className="w-full pl-12 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Filters */}
        <div className="flex gap-3 flex-wrap mb-6">
          {[
            { key: "all", label: "All", count: roleCounts.all },
            { key: "admin", label: "Admin", count: roleCounts.admin },
            { key: "agent", label: "Agent", count: roleCounts.agent },
            { key: "client", label: "Client", count: roleCounts.client },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setFilterRole(f.key);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl ${
                filterRole === f.key
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {currentUsers.map((user) => {
            const role = getRoleConfig(user.role);
            return (
              <div
                key={user.id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border relative"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full text-white ${role.color}`}
                  >
                    {role.text}
                  </span>
                </div>
                <p className="text-slate-600 mt-2">{user.email}</p>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {currentUsers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={40} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              No users found
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
