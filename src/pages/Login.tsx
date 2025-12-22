import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADDED
import { ROLES } from "../types/roleUser"; // ✅ ADDED: Make sure you have roles.ts exporting ADMIN, AGENT, CLIENT
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.svg";
export default function Login() {
  const navigate = useNavigate(); // ✅ ADDED

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ ADDED
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Login attempt:", { email, password });

      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      let role: string = "";
      if (email === "admin@example.com") role = ROLES.ADMIN;
      else if (email === "agent@example.com") role = ROLES.AGENT;
      else if (email === "client@example.com") role = ROLES.CLIENT;
      else {
        setError("Invalid email or password");
        return;
      }

      localStorage.setItem("userRole", role);

      switch (role) {
        case ROLES.ADMIN:
          navigate("/dashboard/admin");
          break;
        case ROLES.AGENT:
          navigate("/dashboard/agent");
          break;
        case ROLES.CLIENT:
          navigate("/dashboard/client");
          break;
        default:
          navigate("/unauthorized");
          break;
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <img
          src={logo}
          alt="Logo"
          height={200}
          width={200}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // ✅ toggled
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />

            {/* Eye button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
