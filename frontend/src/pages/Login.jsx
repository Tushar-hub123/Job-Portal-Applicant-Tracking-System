// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {

//     e.preventDefault();

//     try {

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password }
//       );

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       if (res.data.role === "admin") {
//         navigate("/admin-dashboard");
//       } 
//       else if (res.data.role === "recruiter") {
//         navigate("/recruiter-dashboard");
//       } 
//       else if (res.data.role === "candidate") {
//         navigate("/candidate-dashboard");
//       } 
//       else {
//         navigate("/");
//       }

//     } catch (error) {
//       alert("Invalid Credentials");
//     }

//   };

//   return (

//     <div style={container}>

//       <div style={card}>

//         <h2 style={{marginBottom:"20px"}}>Welcome Back</h2>

//         <form onSubmit={handleLogin} style={formStyle}>

//           <input
//             type="email"
//             placeholder="Email"
//             required
//             style={input}
//             onChange={(e)=>setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             required
//             style={input}
//             onChange={(e)=>setPassword(e.target.value)}
//           />

//           <button type="submit" style={loginBtn}>
//             Login
//           </button>

//         </form>

//         <p style={{marginTop:"15px"}}>
//           Don't have an account? 
//           <Link to="/register"> Register</Link>
//         </p>

//       </div>

//     </div>

//   );
// }

// export default Login;


// /* ---------- Styles ---------- */

// const container = {
//   height:"100vh",
//   display:"flex",
//   justifyContent:"center",
//   alignItems:"center",
//   background:"linear-gradient(135deg,#6366f1,#8b5cf6)"
// }

// const card = {
//   background:"white",
//   padding:"40px",
//   borderRadius:"10px",
//   width:"350px",
//   textAlign:"center",
//   boxShadow:"0 5px 20px rgba(0,0,0,0.2)"
// }

// const formStyle = {
//   display:"flex",
//   flexDirection:"column"
// }

// const input = {
//   padding:"12px",
//   marginBottom:"15px",
//   border:"1px solid #ddd",
//   borderRadius:"6px"
// }

// const loginBtn = {
//   padding:"12px",
//   border:"none",
//   background:"#4f46e5",
//   color:"white",
//   borderRadius:"6px",
//   cursor:"pointer",
//   fontWeight:"bold"
// }

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.role === "admin") navigate("/admin-dashboard");
      else if (res.data.role === "recruiter") navigate("/recruiter-dashboard");
      else if (res.data.role === "candidate") navigate("/candidate-dashboard");
      else navigate("/");
    } catch {
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", minHeight: "100vh", display: "flex", background: "#0a0a0f", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          color: #f5f0eb;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          transition: all 0.3s ease;
          outline: none;
        }
        .login-input::placeholder { color: rgba(255,255,255,0.25); }
        .login-input:focus {
          border-color: rgba(167,139,250,0.5);
          background: rgba(167,139,250,0.05);
          box-shadow: 0 0 0 4px rgba(167,139,250,0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          color: white;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 20px 40px rgba(124,58,237,0.35);
          position: relative;
          overflow: hidden;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 28px 50px rgba(124,58,237,0.45);
        }
        .submit-btn:active { transform: translateY(0); }

        .panel-feature {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 24px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s ease;
        }
        .panel-feature:hover {
          background: rgba(167,139,250,0.06);
          border-color: rgba(167,139,250,0.15);
          transform: translateX(4px);
        }
        .panel-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(167,139,250,0.2), rgba(124,58,237,0.2));
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }

        .orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.2s; }
        .fade-up-3 { animation-delay: 0.3s; }
        .fade-up-4 { animation-delay: 0.4s; }
      `}</style>

      {/* Left Panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "48px 60px", background: "linear-gradient(145deg, #0f0a1e, #130c24)",
        borderRight: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden",
        display: "none"
      }} className="left-panel">
      </div>

      {/* Left Panel - proper */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "48px 60px", position: "relative", overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,58,237,0.15)", top: -150, left: -100 }} />
        <div className="orb" style={{ width: 350, height: 350, background: "rgba(244,114,182,0.08)", bottom: -80, right: -80 }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "12px",
            background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", fontWeight: "800", color: "white"
          }}>J</div>
          <span style={{ fontSize: "20px", fontWeight: "700", color: "#f5f0eb" }}>JobPortal</span>
        </div>

        {/* Middle content */}
        <div>
          <p style={{ fontSize: "12px", color: "#a78bfa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: "600" }}>
            Trusted by thousands
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 3vw, 48px)", fontWeight: "400", lineHeight: "1.15", color: "#f5f0eb", marginBottom: "48px" }}>
            Your next opportunity<br /><em style={{ fontStyle: "italic", color: "rgba(245,240,235,0.45)" }}>is one login away.</em>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: "🎯", title: "Smart Job Matching", desc: "Personalized recommendations based on your skills" },
              { icon: "⚡", title: "Instant Applications", desc: "Apply to multiple jobs with a single profile" },
              { icon: "📊", title: "Real-time Tracking", desc: "Monitor application status in your dashboard" },
            ].map(f => (
              <div className="panel-feature" key={f.title}>
                <div className="panel-icon">{f.icon}</div>
                <div>
                  <div style={{ fontWeight: "600", fontSize: "15px", color: "#f5f0eb", marginBottom: "4px" }}>{f.title}</div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div style={{
          padding: "24px", borderRadius: "20px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)"
        }}>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", fontStyle: "italic", lineHeight: "1.6", marginBottom: "16px" }}>
            "Landed my dream role at a Series B startup within 3 weeks of signing up."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #a78bfa, #f472b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", fontWeight: "700", color: "white"
            }}>P</div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#f5f0eb" }}>Priya Sharma</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Product Manager · Bangalore</div>
            </div>
            <div style={{ marginLeft: "auto", color: "#fbbf24", fontSize: "12px" }}>★★★★★</div>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div style={{
        width: "100%", maxWidth: "520px", display: "flex",
        flexDirection: "column", justifyContent: "center",
        padding: "60px 56px", position: "relative"
      }}>
        <div className="orb" style={{ width: 300, height: 300, background: "rgba(167,139,250,0.08)", top: -50, right: -100 }} />

        <div className="fade-up">
          <p style={{ fontSize: "12px", color: "#a78bfa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", fontWeight: "600" }}>Welcome back</p>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "40px", fontWeight: "400", color: "#f5f0eb", marginBottom: "8px" }}>Sign in</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "15px", marginBottom: "40px" }}>
            Don't have an account? <Link to="/register" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: "600" }}>Join free →</Link>
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="fade-up fade-up-1">
            <label style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.45)", letterSpacing: "0.5px", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="fade-up fade-up-2">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.45)", letterSpacing: "0.5px", textTransform: "uppercase" }}>Password</label>
              <a href="#" style={{ fontSize: "13px", color: "#a78bfa", textDecoration: "none", fontWeight: "500" }}>Forgot?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="fade-up fade-up-3" style={{ marginTop: "8px" }}>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </div>
        </form>

        <div className="fade-up fade-up-4" style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />

            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;