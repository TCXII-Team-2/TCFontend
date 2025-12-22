/* import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole"); // "admin" | "agent" | "client"

  useEffect(() => {
    if (role) {
      navigate(`/dashboard/${role}`);
    } else {
      navigate("/login");
    }
  }, [role, navigate]); 

  useEffect(() => {
    if (role) navigate(`/dashboard/${role}`);
    else navigate("/dashboard");
  }, [navigate]);
  return <div>main dashb</div>;
} */