import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } 
      else if (res.data.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } 
      else if (res.data.role === "candidate") {
        navigate("/candidate-dashboard");
      } 
      else {
        navigate("/");
      }

    } catch (error) {
      alert("Invalid Credentials");
    }

  };

  return (

    <div style={container}>

      <div style={card}>

        <h2 style={{marginBottom:"20px"}}>Welcome Back</h2>

        <form onSubmit={handleLogin} style={formStyle}>

          <input
            type="email"
            placeholder="Email"
            required
            style={input}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            style={input}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit" style={loginBtn}>
            Login
          </button>

        </form>

        <p style={{marginTop:"15px"}}>
          Don't have an account? 
          <Link to="/register"> Register</Link>
        </p>

      </div>

    </div>

  );
}

export default Login;


/* ---------- Styles ---------- */

const container = {
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"linear-gradient(135deg,#6366f1,#8b5cf6)"
}

const card = {
  background:"white",
  padding:"40px",
  borderRadius:"10px",
  width:"350px",
  textAlign:"center",
  boxShadow:"0 5px 20px rgba(0,0,0,0.2)"
}

const formStyle = {
  display:"flex",
  flexDirection:"column"
}

const input = {
  padding:"12px",
  marginBottom:"15px",
  border:"1px solid #ddd",
  borderRadius:"6px"
}

const loginBtn = {
  padding:"12px",
  border:"none",
  background:"#4f46e5",
  color:"white",
  borderRadius:"6px",
  cursor:"pointer",
  fontWeight:"bold"
}