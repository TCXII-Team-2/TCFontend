import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADDED
import { ROLES } from "../types/roleUser"; // ✅ Make sure you have roles.ts

export default function Register() {
  const navigate = useNavigate(); // ✅ ADDED

  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Add your register API call here
      console.log("Register attempt:", {
        firstName,
        familyName,
        email,
        password,
      });

      // Simulated validation
      if (!firstName || !familyName || !email || !password) {
        setError("Please fill in all fields");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      // -------- ADDED ROLE SIMULATION & REDIRECT --------
      // Simulate assigning role based on email pattern or other logic
      let role: string = "";
      if (email.includes("admin")) role = ROLES.ADMIN;
      else if (email.includes("agent")) role = ROLES.AGENT;
      else role = ROLES.CLIENT; // default to client

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
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ firstName, familyName, email, password })
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>

        <div>
          <label htmlFor="familyName">Family Name:</label>
          <input
            id="familyName"
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            placeholder="Enter your family name"
            required
          />
        </div>

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
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}
