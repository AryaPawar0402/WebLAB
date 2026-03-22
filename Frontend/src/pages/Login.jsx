import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/login", { email, password });

      if (res.data) {
        alert("Login Successful ✅");

        // ✅ SAVE USER SESSION
        localStorage.setItem("user", JSON.stringify(res.data));

        // ✅ REDIRECT
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials ❌");
      }
    } catch {
      alert("Server Error ❌");
    }
  };

  return (
    <div style={container}>
      <div style={{ width: "380px" }}>

        <div style={logoBox}>स</div>

        <h2 style={{ textAlign: "center" }}>Participant Login</h2>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          New here?{" "}
          <span onClick={() => navigate("/register")} style={link}>
            Create an account
          </span>
        </p>

        <div style={card}>
          <label style={label}>Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <label style={label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          <button onClick={handleLogin} style={btn}>
            Sign in
          </button>

          <p style={{ textAlign: "center", marginTop: "15px" }}>
            <span onClick={() => navigate("/admin")} style={{ cursor: "pointer" }}>
              Admin Login →
            </span>
          </p>
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

const label = {
  display: "block",
  marginBottom: "5px",
  marginTop: "10px",
  fontSize: "14px"
};

const input = {
  width: "100%",
  padding: "10px",
  border: "1px solid black"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#0f172a",
  color: "white",
  border: "none",
  marginTop: "15px"
};

export default Login;