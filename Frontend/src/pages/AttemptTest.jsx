import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Send, Clock, CheckCircle2, Circle } from "lucide-react";

function AttemptTest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tests/${id}`)
      .then((res) => setTest(res.data))
      .catch(() => {
        alert("Error loading test");
      });
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (qid, value) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const submit = () => {
    alert("Test Submitted Successfully ✅");
    navigate("/student/dashboard");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = test?.questions?.length || 0;

  if (!test) {
    return (
      <div style={{ minHeight: "100vh", background: "#e6f0ff", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ background: "white", padding: "48px 64px", borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", textAlign: "center" }}>
          <div style={{
            width: "48px",
            height: "48px",
            border: "4px solid #e2e8f0",
            borderTopColor: "#3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }} />
          <h2 style={{ color: "#1e293b", fontSize: "18px", fontWeight: "600", margin: 0 }}>Loading test...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#e6f0ff", padding: "24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Enhanced Header with Progress */}
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
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
            <button
              onClick={() => navigate("/student/dashboard")}
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
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0, marginBottom: "4px" }}>
                {test.title}
              </h2>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                {test.questions.length} questions • Answer carefully
              </p>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              padding: "12px 20px",
              borderRadius: "12px",
              border: "1px solid #bfdbfe",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <Clock size={20} style={{ color: "#3b82f6" }} />
              <span style={{ fontSize: "16px", fontWeight: "700", color: "#1e40af" }}>
                {formatTime(timeElapsed)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#64748b" }}>
                Progress
              </span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b" }}>
                {answeredCount} / {totalQuestions} completed
              </span>
            </div>
            <div style={{
              width: "100%",
              height: "10px",
              background: "#e2e8f0",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)"
            }}>
              <div style={{
                width: `${totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0}%`,
                height: "100%",
                background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                borderRadius: "10px",
                transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)"
              }} />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px" }}>
          {test.questions.map((q, index) => {
            const isAnswered = answers[q.id] !== undefined;
            return (
              <div
                key={q.id}
                style={{
                  background: "white",
                  padding: "32px",
                  borderRadius: "20px",
                  border: `2px solid ${isAnswered ? "#3b82f6" : "#e2e8f0"}`,
                  boxShadow: isAnswered
                    ? "0 8px 30px rgba(59, 130, 246, 0.15)"
                    : "0 4px 20px rgba(0,0,0,0.06)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                }}
              >
                {/* Question Number Badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isAnswered
                          ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                          : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                        color: isAnswered ? "white" : "#64748b",
                        width: "38px",
                        height: "38px",
                        borderRadius: "12px",
                        fontSize: "15px",
                        fontWeight: "700",
                        boxShadow: isAnswered
                          ? "0 4px 12px rgba(59, 130, 246, 0.3)"
                          : "0 2px 6px rgba(0,0,0,0.06)",
                      }}
                    >
                      {index + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        background: "#f8fafc",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0"
                      }}
                    >
                      {q.type === "MCQ" ? "Multiple Choice" : "Fill in the Blank"}
                    </span>
                  </div>
                  {isAnswered && (
                    <CheckCircle2 size={24} style={{ color: "#10b981" }} />
                  )}
                </div>

                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1e293b",
                  marginBottom: "24px",
                  lineHeight: "1.6"
                }}>
                  {q.questionText}
                </h3>

                {q.type === "MCQ" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {[
                      { value: q.optionA, label: "A" },
                      { value: q.optionB, label: "B" }
                    ].map((option) => {
                      const isSelected = answers[q.id] === option.value;
                      return (
                        <label
                          key={option.label}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            padding: "18px 20px",
                            background: isSelected
                              ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
                              : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                            border: `2px solid ${isSelected ? "#3b82f6" : "#e2e8f0"}`,
                            borderRadius: "14px",
                            cursor: "pointer",
                            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: isSelected
                              ? "0 4px 16px rgba(59, 130, 246, 0.15)"
                              : "0 2px 8px rgba(0,0,0,0.04)",
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = "#cbd5e1";
                              e.currentTarget.style.background = "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
                              e.currentTarget.style.transform = "translateX(4px)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = "#e2e8f0";
                              e.currentTarget.style.background = "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
                              e.currentTarget.style.transform = "translateX(0)";
                            }
                          }}
                        >
                          <div style={{ position: "relative" }}>
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              checked={isSelected}
                              onChange={() => handleAnswer(q.id, option.value)}
                              style={{
                                width: "22px",
                                height: "22px",
                                cursor: "pointer",
                                accentColor: "#3b82f6"
                              }}
                            />
                          </div>
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: isSelected
                              ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                              : "#e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isSelected ? "white" : "#64748b",
                            fontWeight: "700",
                            fontSize: "14px"
                          }}>
                            {option.label}
                          </div>
                          <span style={{
                            fontSize: "15px",
                            color: isSelected ? "#1e293b" : "#475569",
                            fontWeight: isSelected ? "600" : "500",
                            flex: 1
                          }}>
                            {option.value}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <input
                      style={{
                        width: "100%",
                        padding: "16px 20px",
                        border: `2px solid ${answers[q.id] ? "#3b82f6" : "#e2e8f0"}`,
                        borderRadius: "14px",
                        fontSize: "15px",
                        outline: "none",
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        background: answers[q.id]
                          ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
                          : "white",
                        fontWeight: "500",
                        color: "#1e293b",
                        boxShadow: answers[q.id]
                          ? "0 4px 16px rgba(59, 130, 246, 0.15)"
                          : "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                      placeholder="Type your answer here..."
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswer(q.id, e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3b82f6";
                        e.currentTarget.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = answers[q.id] ? "#3b82f6" : "#e2e8f0";
                        e.currentTarget.style.boxShadow = answers[q.id]
                          ? "0 4px 16px rgba(59, 130, 246, 0.15)"
                          : "0 2px 8px rgba(0,0,0,0.04)";
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Enhanced Submit Button */}
        <div
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
              You have answered <strong style={{ color: "#1e293b" }}>{answeredCount}</strong> out of{" "}
              <strong style={{ color: "#1e293b" }}>{totalQuestions}</strong> questions
            </p>
          </div>
          <button
            onClick={submit}
            disabled={answeredCount === 0}
            style={{
              width: "100%",
              padding: "18px 32px",
              background: answeredCount === 0
                ? "#e2e8f0"
                : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              border: "none",
              borderRadius: "14px",
              cursor: answeredCount === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              fontSize: "17px",
              fontWeight: "700",
              color: answeredCount === 0 ? "#94a3b8" : "white",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: answeredCount === 0
                ? "none"
                : "0 8px 24px rgba(16, 185, 129, 0.3)",
            }}
            onMouseEnter={(e) => {
              if (answeredCount > 0) {
                e.currentTarget.style.background = "linear-gradient(135deg, #059669 0%, #047857 100%)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(16, 185, 129, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (answeredCount > 0) {
                e.currentTarget.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(16, 185, 129, 0.3)";
              }
            }}
          >
            <Send size={22} strokeWidth={2.5} />
            Submit Test
          </button>
        </div>
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

export default AttemptTest;
