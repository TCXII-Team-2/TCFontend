import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADDED
import { ROLES } from "../types/roleUser"; // ✅ ADDED: Make sure you have roles.ts exporting ADMIN, AGENT, CLIENT

export default function Login() {
  const navigate = useNavigate(); // ✅ ADDED

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Add your login API call here
      console.log("Login attempt:", { email, password });

      // Simulated validation
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      // -------- ADDED ROLE SIMULATION & REDIRECT --------
      let role: string = "";
      if (email === "admin@example.com") role = ROLES.ADMIN;
      else if (email === "agent@example.com") role = ROLES.AGENT;
      else if (email === "client@example.com") role = ROLES.CLIENT;
      else {
        setError("Invalid email or password");
        return;
      }

      // Save role to localStorage
      localStorage.setItem("userRole", role);

      // Redirect based on role
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
      // ---------------------------------------------------

      // TODO: Replace with actual API call
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}
