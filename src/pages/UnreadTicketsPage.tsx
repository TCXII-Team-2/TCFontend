import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Response {
  id: number;
  ticket_id: number;
  content: string;
  ticket?: {
    sujet: string;
    description: string;
  };
}

export default function ResponsesPage() {
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchResponses = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/responses/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // ✅ Make sure we set an array
        setResponses(Array.isArray(data) ? data : data.results ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  // Filter/search responses
  const filteredResponses = responses.filter(
    (r) =>
      r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.ticket?.sujet.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false) ||
      (r.ticket?.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ??
        false)
  );

  // Pagination
  const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResponses = filteredResponses.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return <div className="p-8 text-center">Loading responses...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">Responses</h1>

        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search responses..."
            className="w-full pl-12 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {currentResponses.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-200 p-6"
            >
              <p className="text-slate-700 font-medium">{r.content}</p>

              {r.ticket && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {r.ticket.sujet}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {r.ticket.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {currentResponses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <h3 className="text-xl font-bold text-slate-700">
              No responses found
            </h3>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-between items-center bg-white rounded-2xl p-4">
            <span className="text-sm text-slate-600">
              Showing {startIndex + 1}–
              {Math.min(endIndex, filteredResponses.length)} of{" "}
              {filteredResponses.length}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-10 h-10 rounded-lg ${
                    p === currentPage
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
