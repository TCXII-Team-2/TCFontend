import { useState } from "react";

interface TicketFormData {
  sujet: string;
  date_probleme: string;
  description: string;
}

interface TicketFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // optional refresh callback
}

export default function TicketFormModal({
  isOpen,
  onClose,
  onSuccess,
}: TicketFormModalProps) {
  const [formData, setFormData] = useState<TicketFormData>({
    sujet: "",
    date_probleme: "",
    description: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not authenticated");
        return;
      }

      const response = await fetch("http://localhost:8000/api/v1/tickets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ TOKEN
        },
        body: JSON.stringify({
          sujet: formData.sujet,
          date_probleme: formData.date_probleme, // ⚠️ backend naming
          description: formData.description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // ✅ FastAPI error handling
        if (Array.isArray(data.detail)) {
          setError(data.detail.map((e: any) => e.msg).join(", "));
        } else if (typeof data.detail === "string") {
          setError(data.detail);
        } else {
          setError("Failed to create ticket");
        }
        return;
      }

      // ✅ Success
      setFormData({
        sujet: "",
        date_probleme: "",
        description: "",
      });

      onSuccess?.(); // refresh ticket list if needed
      onClose();
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Create New Ticket
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-1">Subject *</label>
            <input
              type="text"
              name="sujet"
              value={formData.sujet}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date of the problem *
            </label>
            <input
              type="date"
              name="date_probleme"
              value={formData.date_probleme}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#4A84DD] text-white rounded-lg hover:bg-[#3f73c4] disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
