import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role || role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome Admin 👑</p>

      <button>Manage Users</button>
      <br /><br />
      <button>Manage Jobs</button>
      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;