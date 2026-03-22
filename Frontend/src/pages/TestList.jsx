import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ArrowLeft, FileText, Play, Eye, Plus, TrendingUp } from "lucide-react";

function TestList() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = !!localStorage.getItem("admin");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tests")
      .then((res) => {
        const testsData = Array.isArray(res.data) ? res.data : [];
        setTests(testsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading tests:", err);
        setError("Failed to load tests. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#e6f0ff", padding: "24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Enhanced Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            padding: "28px 32px",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)";
                  e.currentTarget.style.transform = "translateX(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <ArrowLeft size={22} strokeWidth={2.5} />
              </button>
              <div>
                <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0, lineHeight: "1.2" }}>
                  {isAdmin ? "All Tests" : "Available Tests"}
                </h2>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0, marginTop: "6px", lineHeight: "1.4" }}>
                  {isAdmin ? "Manage and view all tests" : "Select a test to begin your assessment"}
                </p>
              </div>
            </div>
            {isAdmin && (
              <button
                onClick={() => navigate("/admin/create-test")}
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
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
                <Plus size={18} strokeWidth={2.5} />
                Create Test
              </button>
            )}
          </div>
        </div>

        {/* Loading / Error / Tests List */}
        {loading ? (
          <div
            style={{
              background: "white",
              padding: "80px 40px",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              border: "4px solid #e2e8f0",
              borderTopColor: "#3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px"
            }} />
            <p style={{ color: "#64748b", fontSize: "16px", fontWeight: "500" }}>Loading tests...</p>
          </div>
        ) : error ? (
          <div
            style={{
              background: "white",
              padding: "64px 40px",
              borderRadius: "20px",
              border: "2px solid #fee2e2",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(220, 38, 38, 0.1)",
            }}
          >
            <div style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <FileText size={32} style={{ color: "#dc2626" }} />
            </div>
            <p style={{ color: "#dc2626", fontSize: "16px", fontWeight: "600", marginBottom: "24px" }}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 12px rgba(30, 41, 59, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #334155 0%, #475569 100%)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #1e293b 0%, #334155 100%)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Retry
            </button>
          </div>
        ) : tests.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "64px 40px",
              borderRadius: "20px",
              border: "2px dashed #cbd5e1",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}>
              <FileText size={40} style={{ color: "#64748b" }} />
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
              No Tests Available
            </h3>
            <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "28px" }}>
              {isAdmin ? "Get started by creating your first test" : "No tests available at the moment. Check back later!"}
            </p>
            {isAdmin && (
              <button
                onClick={() => navigate("/admin/create-test")}
                style={{
                  padding: "14px 28px",
                  background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 4px 12px rgba(30, 41, 59, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #334155 0%, #475569 100%)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(30, 41, 59, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #1e293b 0%, #334155 100%)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(30, 41, 59, 0.3)";
                }}
              >
                <Plus size={20} />
                Create Your First Test
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Stats Card */}
            <div style={{
              background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              padding: "24px 32px",
              borderRadius: "16px",
              border: "1px solid #bfdbfe",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
            }}>
              <div style={{
                width: "56px",
                height: "56px",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              }}>
                <TrendingUp size={28} style={{ color: "white" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "14px", color: "#1e40af", fontWeight: "600", margin: 0, marginBottom: "4px" }}>
                  Total Tests Available
                </p>
                <p style={{ fontSize: "32px", fontWeight: "800", color: "#1e293b", margin: 0 }}>
                  {tests.length}
                </p>
              </div>
            </div>

            {/* Tests Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {tests.map((test) => (
                <div
                  key={test.id}
                  style={{
                    background: "white",
                    padding: "28px 32px",
                    borderRadius: "18px",
                    border: "2px solid #e2e8f0",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (isAdmin) {
                      navigate(`/test/${test.id}/details`);
                    } else {
                      navigate(`/test/${test.id}`);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1 }}>
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          background: isAdmin
                            ? "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)"
                            : "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                          padding: "14px",
                          borderRadius: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: isAdmin ? "1px solid #d8b4fe" : "1px solid #bfdbfe",
                          boxShadow: isAdmin
                            ? "0 4px 12px rgba(139, 92, 246, 0.15)"
                            : "0 4px 12px rgba(59, 130, 246, 0.15)",
                        }}
                      >
                        <FileText
                          size={28}
                          style={{ color: isAdmin ? "#8b5cf6" : "#3b82f6" }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#1e293b",
                          margin: 0,
                          lineHeight: "1.3"
                        }}>
                          {test.title}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#64748b",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            lineHeight: "1.4"
                          }}>
                            <span style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "#3b82f6",
                            }} />
                            {test.questions?.length || 0} question{(test.questions?.length || 0) !== 1 ? "s" : ""}
                          </span>
                          {isAdmin && (
                            <span style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "#8b5cf6",
                              background: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
                              padding: "4px 10px",
                              borderRadius: "6px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              border: "1px solid #d8b4fe"
                            }}>
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      style={{
                        padding: "12px 24px",
                        background: isAdmin
                          ? "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                          : "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "white",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: isAdmin
                          ? "0 4px 12px rgba(139, 92, 246, 0.3)"
                          : "0 4px 12px rgba(30, 41, 59, 0.3)",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isAdmin) {
                          navigate(`/test/${test.id}/details`);
                        } else {
                          navigate(`/test/${test.id}`);
                        }
                      }}
                      onMouseEnter={(e) => {
                        if (isAdmin) {
                          e.currentTarget.style.background = "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)";
                          e.currentTarget.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.4)";
                        } else {
                          e.currentTarget.style.background = "linear-gradient(135deg, #334155 0%, #475569 100%)";
                          e.currentTarget.style.boxShadow = "0 6px 20px rgba(30, 41, 59, 0.4)";
                        }
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        if (isAdmin) {
                          e.currentTarget.style.background = "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)";
                        } else {
                          e.currentTarget.style.background = "linear-gradient(135deg, #1e293b 0%, #334155 100%)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(30, 41, 59, 0.3)";
                        }
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {isAdmin ? (
                        <>
                          <Eye size={18} strokeWidth={2.5} />
                          View Details
                        </>
                      ) : (
                        <>
                          <Play size={18} strokeWidth={2.5} />
                          Start Test
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default TestList;