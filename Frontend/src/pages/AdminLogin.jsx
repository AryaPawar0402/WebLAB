import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/admin/login", { email, password });

      if (res.data) {
        alert("Admin Login Successful ✅");

        // ✅ SAVE ADMIN SESSION
        localStorage.setItem("admin", JSON.stringify(res.data));

        // ✅ REDIRECT
        navigate("/admin/dashboard");
      } else {
        alert("Invalid Admin ❌");
      }
    } catch {
      alert("Server Error ❌");
    }
  };

  return (
    <div style={container}>
      <div style={{ width: "380px" }}>

        <div style={logoBox}>स</div>

        <h2 style={{ textAlign: "center" }}>Admin Login</h2>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          <span onClick={() => navigate("/")} style={link}>
            Participant Login
          </span>
        </p>

        <div style={card}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          <button onClick={handleLogin} style={btn}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#f0f6ff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const logoBox = {
  width: "45px",
  height: "45px",
  background: "#4f46e5",
  margin: "0 auto 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white"
};

const link = { color: "#4f46e5", cursor: "pointer" };

const card = {
  background: "#fff",
  border: "1px solid black",
  padding: "25px"
};

const input = {
  width: "100%",
  padding: "10px",
  border: "1px solid black",
  marginTop: "10px"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#0f172a",
  color: "white",
  border: "none",
  marginTop: "10px"
};

export default AdminLogin;