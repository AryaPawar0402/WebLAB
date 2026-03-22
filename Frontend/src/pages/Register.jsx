import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    contactNumber: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/register", form);
      alert("Account Created");
      navigate("/");
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div style={container}>
      <div style={{ width: "600px" }}>

        <div style={logoBox}>स</div>

        <h2 style={title}>Create Participant Account</h2>

        <p style={subtitle}>
          Already have an account?{" "}
          <span onClick={() => navigate("/")} style={link}>
            Sign in here
          </span>
        </p>

        <div style={card}>

          {/* BASIC INFO */}
          <div style={sectionHeader}>👤 Basic Information</div>

          <label style={label}>Email address</label>
          <input name="email" onChange={handleChange} style={input}/>

          <label style={label}>Full Name</label>
          <input name="fullName" onChange={handleChange} style={input}/>

          <label style={label}>Contact Number</label>
          <input name="contactNumber" onChange={handleChange} style={input}/>

          <label style={label}>Age</label>
          <input name="age" onChange={handleChange} style={input}/>

          {/* SECURITY */}
          <div style={{ ...sectionHeader, marginTop: "20px" }}>🔒 Security</div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "100%" }}>
              <label style={label}>Password</label>
              <input name="password" type="password" onChange={handleChange} style={input}/>
            </div>

            <div style={{ width: "100%" }}>
              <label style={label}>Confirm Password</label>
              <input name="confirmPassword" type="password" onChange={handleChange} style={input}/>
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} style={btn}>
          Create Account
        </button>
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

const title = { textAlign: "center" };
const subtitle = { textAlign: "center", marginBottom: "20px" };
const link = { color: "#4f46e5", cursor: "pointer" };

const card = {
  background: "#fff",
  border: "1px solid black",
  padding: "25px"
};

const sectionHeader = {
  fontWeight: "600",
  borderBottom: "1px solid #ccc",
  paddingBottom: "6px",
  marginBottom: "10px"
};

const label = {
  display: "block",
  marginTop: "10px",
  marginBottom: "4px",
  fontSize: "14px"
};

const input = {
  width: "100%",
  padding: "10px",
  border: "1px solid black"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#0f172a",
  color: "white",
  border: "none",
  marginTop: "10px"
};

export default Register;