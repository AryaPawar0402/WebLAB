import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { FileText, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("overview");
  const [stats, setStats] = useState({
    totalTests: 0,
    activeStudents: 0,
    completedTests: 0,
  });

  const admin = localStorage.getItem("admin");

  useEffect(() => {
    if (!admin) {
      navigate("/admin");
      return;
    }

    const fetchStats = async () => {
      try {
        // 1. Get total tests
        const testsRes = await axios.get("http://localhost:8080/api/tests");
        const totalTests = Array.isArray(testsRes.data) ? testsRes.data.length : 0;
        console.log("Tests response:", testsRes.data);
        console.log("Total tests:", totalTests);

        // 2. Get active students count (students only)
        const studentsRes = await axios.get("http://localhost:8080/api/users/count?role=STUDENT");
        const activeStudents = studentsRes.data;
        console.log("Active students:", activeStudents);

        // 3. Completed tests (placeholder for now – you can later fetch from /api/results/count)
        const completedTests = 0;

        setStats({ totalTests, activeStudents, completedTests });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setStats({ totalTests: 0, activeStudents: 0, completedTests: 0 });
      }
    };

    fetchStats();
  }, [admin, navigate]);

  if (!admin) {
    return null;
  }

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      onClick: () => setCurrentView("overview"),
    },
    {
      label: "Create Test",
      icon: <FileText size={18} />,
      onClick: () => navigate("/admin/create-test"),
    },
    {
      label: "View All Tests",
      icon: <FileText size={18} />,
      onClick: () => navigate("/tests"),
    },
    {
      label: "Logout",
      icon: <LogOut size={18} />,
      onClick: () => {
        localStorage.removeItem("admin");
        navigate("/admin");
      },
      variant: "danger",
    },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Admin Panel">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Welcome Card */}
        <div
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
            Welcome, Admin
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Manage your tests and monitor student performance from your dashboard
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <StatCard
            title="Total Tests"
            value={stats.totalTests}
            icon={<FileText size={24} />}
            color="#3b82f6"
          />
          <StatCard
            title="Active Students"
            value={stats.activeStudents}
            icon={<LayoutDashboard size={24} />}
            color="#10b981"
          />
          <StatCard
            title="Completed"
            value={stats.completedTests}
            icon={<FileText size={24} />}
            color="#8b5cf6"
          />
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1e293b", marginBottom: "16px" }}>
            Quick Actions
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <ActionButton
              label="Create New Test"
              onClick={() => navigate("/admin/create-test")}
              variant="primary"
            />
            <ActionButton
              label="View All Tests"
              onClick={() => navigate("/tests")}
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "8px" }}>{title}</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b" }}>{value}</p>
        </div>
        <div
          style={{
            background: `${color}15`,
            padding: "12px",
            borderRadius: "10px",
            color: color,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ label, onClick, variant }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        background: variant === "primary" ? "#1e293b" : "white",
        color: variant === "primary" ? "white" : "#1e293b",
        border: `1px solid ${variant === "primary" ? "#1e293b" : "#e2e8f0"}`,
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.background = "#334155";
        } else {
          e.currentTarget.style.background = "#f8fafc";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.background = "#1e293b";
        } else {
          e.currentTarget.style.background = "white";
        }
      }}
    >
      {label}
    </button>
  );
}

export default AdminDashboard;