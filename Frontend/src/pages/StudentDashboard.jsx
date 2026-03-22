import { useNavigate } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { FileText, LogOut, LayoutDashboard, BookOpen, TrendingUp, Award, Clock, Target } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

function StudentDashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("overview");
  const [stats, setStats] = useState({
    testsAvailable: 0,
    completedTests: 0,
    averageScore: 0,
  });
  const [availableTests, setAvailableTests] = useState([]);

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const testsRes = await axios.get("http://localhost:8080/api/tests");
        const tests = Array.isArray(testsRes.data) ? testsRes.data : [];
        setAvailableTests(tests);
        setStats((prev) => ({ ...prev, testsAvailable: tests.length }));

        // TODO: fetch completed tests and average score
        setStats((prev) => ({
          ...prev,
          completedTests: 0,
          averageScore: 0,
        }));
      } catch (error) {
        console.error("Error fetching student dashboard data:", error);
        setAvailableTests([]);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      onClick: () => setCurrentView("overview"),
    },
    {
      label: "Available Tests",
      icon: <BookOpen size={18} />,
      onClick: () => navigate("/tests"),
    },
    {
      label: "Logout",
      icon: <LogOut size={18} />,
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/");
      },
      variant: "danger",
    },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Student Portal">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Enhanced Welcome Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            padding: "40px",
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            marginBottom: "32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(30%, -30%)",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
              <div style={{
                width: "56px",
                height: "56px",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
              }}>
                <Award size={28} style={{ color: "white" }} />
              </div>
              <div>
                <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#1e293b", margin: 0 }}>
                  Welcome Back, Student
                </h2>
                <p style={{ color: "#64748b", fontSize: "15px", margin: 0, marginTop: "4px" }}>
                  Continue your learning journey and track your progress
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <StatCard
            title="Tests Available"
            value={stats.testsAvailable}
            icon={<BookOpen size={28} />}
            color="#3b82f6"
            bgGradient="linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
            borderColor="#bfdbfe"
          />
          <StatCard
            title="Completed Tests"
            value={stats.completedTests}
            icon={<Target size={28} />}
            color="#10b981"
            bgGradient="linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
            borderColor="#86efac"
          />
          <StatCard
            title="Average Score"
            value={`${stats.averageScore}%`}
            icon={<TrendingUp size={28} />}
            color="#f59e0b"
            bgGradient="linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
            borderColor="#fcd34d"
          />
        </div>

        {/* Enhanced Available Tests Section */}
        <div
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b", margin: 0, marginBottom: "4px" }}>
                Available Tests
              </h3>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                Select a test to begin your assessment
              </p>
            </div>
            <button
              onClick={() => navigate("/tests")}
              style={{
                padding: "12px 20px",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
              }}
            >
              View All Tests
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {availableTests.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                borderRadius: "16px",
                border: "2px dashed #cbd5e1"
              }}>
                <div style={{
                  width: "72px",
                  height: "72px",
                  background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <Clock size={36} style={{ color: "#64748b" }} />
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
                  No Tests Available
                </h4>
                <p style={{ color: "#64748b", fontSize: "14px" }}>
                  No tests available at the moment. Check back later!
                </p>
              </div>
            ) : (
              availableTests.slice(0, 3).map((test) => (
                <TestCard
                  key={test.id}
                  title={test.title}
                  description={`${test.questions?.length || 0} questions`}
                  onClick={() => navigate(`/test/${test.id}`)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon, color, bgGradient, borderColor }) {
  return (
    <div
      style={{
        background: "white",
        padding: "28px",
        borderRadius: "20px",
        border: "2px solid #e2e8f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
        e.currentTarget.style.borderColor = borderColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
        e.currentTarget.style.borderColor = "#e2e8f0";
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "120px",
        height: "120px",
        background: bgGradient,
        borderRadius: "50%",
        transform: "translate(40%, -40%)",
        opacity: 0.6,
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: "#64748b", fontSize: "13px", fontWeight: "600", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {title}
            </p>
            <p style={{ fontSize: "40px", fontWeight: "800", color: "#1e293b", margin: 0, lineHeight: 1 }}>
              {value}
            </p>
          </div>
          <div
            style={{
              background: bgGradient,
              padding: "14px",
              borderRadius: "16px",
              color: color,
              boxShadow: `0 4px 12px ${color}30`,
              border: `1px solid ${borderColor}`,
            }}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestCard({ title, description, onClick }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: "24px 28px",
        borderRadius: "16px",
        border: "2px solid #e2e8f0",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)";
        e.currentTarget.style.borderColor = "#3b82f6";
        e.currentTarget.style.transform = "translateX(8px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(59, 130, 246, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
          <div style={{
            width: "48px",
            height: "48px",
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
          }}>
            <FileText size={24} style={{ color: "white" }} />
          </div>
          <div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "4px", margin: 0 }}>
              {title}
            </h4>
            <p style={{ fontSize: "14px", color: "#64748b", margin: 0, marginTop: "4px" }}>{description}</p>
          </div>
        </div>
        <button
          style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "700",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 4px 12px rgba(30, 41, 59, 0.3)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #334155 0%, #475569 100%)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #1e293b 0%, #334155 100%)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
