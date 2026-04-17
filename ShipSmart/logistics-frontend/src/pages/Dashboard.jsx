import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to ShipSmart Management System
      </p>

      <button
        onClick={() => navigate("/add-seller")}
        style={{
          padding: "12px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add Seller & Create Order
      </button>
    </div>
  );
}

export default Dashboard;