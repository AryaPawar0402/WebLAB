import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Plus, Trash2, Save, ArrowLeft, FileText, AlertCircle } from "lucide-react";

function CreateTest() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { type: "MCQ", questionText: "", optionA: "", optionB: "", correctAnswer: "" }]);
  };

  const handleChange = (i, field, value) => {
    const updated = [...questions];
    updated[i][field] = value;
    setQuestions(updated);
  };

  const removeQuestion = (i) => {
    setQuestions(questions.filter((_, index) => index !== i));
  };

  const submit = async () => {
    if (!title.trim()) {
      alert("Please enter a test title");
      return;
    }
    if (questions.length === 0) {
      alert("Please add at least one question");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/tests/create", {
        title,
        questions,
      });
      alert("Test Created ✅");
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Error creating test");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e6f0ff", padding: "24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Enhanced Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            padding: "32px",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            marginBottom: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <button
                onClick={() => navigate("/admin/dashboard")}
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
                  Create New Test
                </h2>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0, marginTop: "6px", lineHeight: "1.4" }}>
                  Build your test by adding a title and questions
                </p>
              </div>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              padding: "12px 20px",
              borderRadius: "12px",
              border: "1px solid #bfdbfe",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "100px"
            }}>
              <span style={{ fontSize: "28px", fontWeight: "800", color: "#1e40af", lineHeight: "1", marginBottom: "2px" }}>
                {questions.length}
              </span>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Question{questions.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Title Input */}
          <div style={{ position: "relative" }}>
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: "#475569",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Test Title *
            </label>
            <input
              style={{
                width: "100%",
                padding: "16px 20px",
                border: `2px solid ${title ? "#3b82f6" : "#e2e8f0"}`,
                borderRadius: "14px",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                background: title ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" : "white",
                fontWeight: "500",
                color: "#1e293b",
                boxShadow: title
                  ? "0 4px 16px rgba(59, 130, 246, 0.15)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
              }}
              placeholder="Enter a descriptive title for your test..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = title ? "#3b82f6" : "#e2e8f0";
                e.currentTarget.style.boxShadow = title
                  ? "0 4px 16px rgba(59, 130, 246, 0.15)"
                  : "0 2px 8px rgba(0,0,0,0.04)";
              }}
            />
          </div>
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px" }}>
          {questions.length === 0 ? (
            <div style={{
              background: "white",
              padding: "64px 32px",
              borderRadius: "20px",
              border: "2px dashed #cbd5e1",
              textAlign: "center",
            }}>
              <div style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <AlertCircle size={32} style={{ color: "#64748b" }} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
                No questions added yet
              </h3>
              <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px" }}>
                Click the "Add Question" button below to create your first question
              </p>
            </div>
          ) : (
            questions.map((q, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  padding: "32px",
                  borderRadius: "20px",
                  border: "2px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                        color: "white",
                        width: "38px",
                        height: "38px",
                        borderRadius: "12px",
                        fontSize: "15px",
                        fontWeight: "700",
                        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                      Question {i + 1}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeQuestion(i)}
                    style={{
                      background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                      border: "1px solid #fca5a5",
                      borderRadius: "12px",
                      padding: "10px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#dc2626",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 2px 8px rgba(220, 38, 38, 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #fca5a5 0%, #f87171 100%)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(220, 38, 38, 0.15)";
                    }}
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Question Text */}
                  <div>
                    <label style={labelStyle}>Question Text *</label>
                    <input
                      style={inputStyle}
                      placeholder="Enter your question..."
                      value={q.questionText}
                      onChange={(e) => handleChange(i, "questionText", e.target.value)}
                    />
                  </div>

                  {/* Question Type */}
                  <div>
                    <label style={labelStyle}>Question Type</label>
                    <select
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        backgroundSize: "20px",
                        paddingRight: "40px",
                        appearance: "none",
                      }}
                      value={q.type}
                      onChange={(e) => handleChange(i, "type", e.target.value)}
                    >
                      <option value="MCQ">Multiple Choice (MCQ)</option>
                      <option value="FILL">Fill in the Blank</option>
                    </select>
                  </div>

                  {/* Options (only for MCQ) */}
                  {q.type === "MCQ" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={labelStyle}>Option A *</label>
                        <input
                          style={inputStyle}
                          placeholder="First option"
                          value={q.optionA}
                          onChange={(e) => handleChange(i, "optionA", e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Option B *</label>
                        <input
                          style={inputStyle}
                          placeholder="Second option"
                          value={q.optionB}
                          onChange={(e) => handleChange(i, "optionB", e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Correct Answer */}
                  <div>
                    <label style={labelStyle}>Correct Answer *</label>
                    <input
                      style={{
                        ...inputStyle,
                        background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
                        borderColor: "#86efac",
                      }}
                      placeholder={q.type === "MCQ" ? "Enter correct option (A or B)" : "Enter correct answer"}
                      value={q.correctAnswer}
                      onChange={(e) => handleChange(i, "correctAnswer", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Action Buttons */}
        <div
          style={{
            background: "white",
            padding: "28px 32px",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            display: "flex",
            gap: "16px",
          }}
        >
          <button
            onClick={addQuestion}
            style={{
              flex: 1,
              padding: "16px 24px",
              background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
              border: "2px solid #e2e8f0",
              borderRadius: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#1e293b",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)";
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            }}
          >
            <Plus size={20} strokeWidth={2.5} />
            Add Question
          </button>
          <button
            onClick={submit}
            disabled={!title.trim() || questions.length === 0}
            style={{
              flex: 1,
              padding: "16px 24px",
              background: (!title.trim() || questions.length === 0)
                ? "#e2e8f0"
                : "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              border: "none",
              borderRadius: "14px",
              cursor: (!title.trim() || questions.length === 0) ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontSize: "15px",
              fontWeight: "700",
              color: (!title.trim() || questions.length === 0) ? "#94a3b8" : "white",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: (!title.trim() || questions.length === 0)
                ? "none"
                : "0 8px 24px rgba(30, 41, 59, 0.3)",
            }}
            onMouseEnter={(e) => {
              if (title.trim() && questions.length > 0) {
                e.currentTarget.style.background = "linear-gradient(135deg, #334155 0%, #475569 100%)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(30, 41, 59, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (title.trim() && questions.length > 0) {
                e.currentTarget.style.background = "linear-gradient(135deg, #1e293b 0%, #334155 100%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(30, 41, 59, 0.3)";
              }
            }}
          >
            <Save size={20} strokeWidth={2.5} />
            Create Test
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#475569",
  marginBottom: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  border: "2px solid #e2e8f0",
  borderRadius: "12px",
  fontSize: "15px",
  outline: "none",
  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  background: "white",
  color: "#1e293b",
  fontWeight: "500",
  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
};

export default CreateTest;