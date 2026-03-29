// import { Link } from "react-router-dom";
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

// function HomePage() {
//   return (
//     <div style={{ fontFamily: "'Poppins', sans-serif", margin: 0, padding: 0 }}>
      
//       {/* Navbar */}
//       <nav style={navStyle}>
//         <h2 style={{ color: "#4f46e5", fontWeight: "700", fontSize: "28px" }}>JobPortal</h2>
//         <div style={{ display: "flex", gap: "15px" }}>
//           <Link to="/login">
//             <button style={loginBtn}>Login</button>
//           </Link>
//           <Link to="/register">
//             <button style={signupBtn}>Sign Up</button>
//           </Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section style={heroSection}>
//         <h1 style={title}>
//           Find Your <span style={{ color: "#4f46e5" }}>Dream Job</span>
//         </h1>
//         <p style={subtitle}>
//           Connect with top companies and build your career
//         </p>
//         <Link to="/register">
//           <button style={heroBtn}>Get Started</button>
//         </Link>
//       </section>

//       {/* Features Section */}
//       <section style={featuresSection}>
//         <h2 style={featuresTitle}>Why Choose Us?</h2>
//         <div style={featuresGrid}>
//           <div style={featureCard}>
//             <h3>Top Companies</h3>
//             <p>Get access to the best companies looking for talent.</p>
//           </div>
//           <div style={featureCard}>
//             <h3>Easy Application</h3>
//             <p>Apply to multiple jobs with just a few clicks.</p>
//           </div>
//           <div style={featureCard}>
//             <h3>Career Growth</h3>
//             <p>Find jobs that match your skillset and ambitions.</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer style={footer}>
//         <div style={footerContainer}>

//           <div style={footerSection}>
//             <h3>JobPortal</h3>
//             <p>Your gateway to your dream career. Connecting top talent with top companies.</p>
//           </div>

//           <div style={footerSection}>
//             <h4>Quick Links</h4>
//             <ul style={footerLinks}>
//               <li><Link style={linkStyle} to="/login">Login</Link></li>
//               <li><Link style={linkStyle} to="/register">Sign Up</Link></li>
//             </ul>
//           </div>

//           <div style={footerSection}>
//             <h4>Follow Us</h4>
//             <div style={socialIcons}>
//               <a href="#" style={socialLink}><FaFacebookF /></a>
//               <a href="#" style={socialLink}><FaTwitter /></a>
//               <a href="#" style={socialLink}><FaLinkedinIn /></a>
//               <a href="#" style={socialLink}><FaInstagram /></a>
//             </div>
//           </div>

          

//         </div>

//         <p style={footerBottom}>© 2026 JobPortal. All rights reserved.</p>
//       </footer>

//     </div>
//   );
// }

// export default HomePage;

// /* ---------- Styles ---------- */

// const navStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "20px 60px",
//   background: "#fff",
//   boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//   position: "sticky",
//   top: 0,
//   zIndex: 1000
// };

// const loginBtn = {
//   padding: "10px 20px",
//   border: "2px solid #4f46e5",
//   background: "transparent",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontWeight: "500",
//   color: "#4f46e5",
//   transition: "0.3s",
// };
// const signupBtn = {
//   padding: "10px 20px",
//   border: "none",
//   background: "#4f46e5",
//   color: "white",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontWeight: "500",
//   transition: "transform 0.2s ease",
// };

// const heroSection = {
//   height: "90vh",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   background: "linear-gradient(135deg, #eef2ff, #f0f4ff)",
//   textAlign: "center",
//   padding: "0 20px"
// };
// const title = { fontSize: "52px", fontWeight: "700", marginBottom: "15px", lineHeight: "1.2" };
// const subtitle = { fontSize: "20px", color: "#6b7280", marginBottom: "30px" };
// const heroBtn = {
//   padding: "16px 36px",
//   fontSize: "16px",
//   background: "#4f46e5",
//   color: "white",
//   border: "none",
//   borderRadius: "10px",
//   cursor: "pointer",
//   boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)",
//   transition: "all 0.3s ease"
// };

// const featuresSection = { padding: "80px 20px", background: "#f8fafc", textAlign: "center" };
// const featuresTitle = { fontSize: "36px", fontWeight: "700", marginBottom: "40px" };
// const featuresGrid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//   gap: "30px",
//   maxWidth: "1000px",
//   margin: "0 auto"
// };
// const featureCard = {
//   padding: "30px",
//   borderRadius: "20px",
//   background: "rgba(255, 255, 255, 0.95)",
//   boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   cursor: "pointer"
// };

// /* ---------- Footer Styles ---------- */

// const footer = {
//   background: "#1f2937",
//   color: "#d1d5db",
//   padding: "60px 20px 20px 20px",
//   marginTop: "50px"
// };

// const footerContainer = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//   gap: "40px",
//   maxWidth: "1200px",
//   margin: "0 auto"
// };

// const footerSection = { lineHeight: "1.8" };

// const footerLinks = { listStyle: "none", padding: 0 };

// const linkStyle = { textDecoration: "none", color: "#d1d5db", transition: "0.3s" };

// const socialIcons = { display: "flex", gap: "15px", marginTop: "10px" };

// const socialLink = {
//   color: "#fff",
//   background: "#4f46e5",
//   padding: "10px",
//   borderRadius: "50%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   transition: "0.3s",
//   fontSize: "14px"
// };

// const newsletterInput = {
//   padding: "10px",
//   borderRadius: "6px 0 0 6px",
//   border: "none",
//   outline: "none",
//   flex: 1
// };

// const newsletterBtn = {
//   padding: "10px 20px",
//   border: "none",
//   borderRadius: "0 6px 6px 0",
//   background: "#4f46e5",
//   color: "#fff",
//   cursor: "pointer",
//   transition: "0.3s"
// };

// const footerBottom = {
//   textAlign: "center",
//   paddingTop: "20px",
//   fontSize: "14px",
//   color: "#9ca3af"
// };

import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function HomePage() {
  return (
    <div style={{ fontFamily: "'Syne', sans-serif", margin: 0, padding: 0, background: "#0a0a0f", color: "#f5f0eb", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-link-btn {
          position: relative;
          padding: 10px 28px;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: transparent;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          color: #f5f0eb;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .nav-link-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.07);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .nav-link-btn:hover::before { opacity: 1; }

        .signup-pill {
          padding: 10px 28px;
          border: none;
          background: #f5f0eb;
          color: #0a0a0f;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          transform: translateY(0);
        }
        .signup-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(245,240,235,0.2);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 40px;
          letter-spacing: 1px;
          text-transform: uppercase;
          animation: fadeUp 0.8s ease both;
        }
        .hero-badge span {
          width: 6px; height: 6px;
          background: #a78bfa;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        .hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 400;
          line-height: 1.05;
          margin-bottom: 28px;
          animation: fadeUp 0.8s 0.1s ease both;
        }
        .hero-title em {
          font-style: italic;
          background: linear-gradient(135deg, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 18px;
          color: rgba(245,240,235,0.5);
          margin-bottom: 48px;
          max-width: 440px;
          line-height: 1.7;
          font-weight: 400;
          animation: fadeUp 0.8s 0.2s ease both;
        }
        .hero-cta-wrap {
          display: flex;
          gap: 16px;
          align-items: center;
          animation: fadeUp 0.8s 0.3s ease both;
        }
        .hero-cta {
          padding: 18px 44px;
          font-size: 15px;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          color: white;
          border: none;
          border-radius: 100px;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 20px 50px rgba(124,58,237,0.4);
        }
        .hero-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 28px 60px rgba(124,58,237,0.5);
        }
        .hero-secondary {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          font-family: 'Syne', sans-serif;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .stat-item {
          text-align: center;
          animation: fadeUp 0.8s ease both;
        }
        .stat-num {
          font-family: 'DM Serif Display', serif;
          font-size: 48px;
          font-weight: 400;
          color: #f5f0eb;
          line-height: 1;
        }
        .stat-label {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-top: 6px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .feature-card-new {
          padding: 40px 36px;
          border-radius: 24px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card-new::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(167,139,250,0.05), rgba(244,114,182,0.05));
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .feature-card-new:hover::before { opacity: 1; }
        .feature-card-new:hover {
          border-color: rgba(167,139,250,0.2);
          transform: translateY(-6px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        .feature-icon {
          width: 52px; height: 52px;
          border-radius: 16px;
          background: linear-gradient(135deg, #a78bfa22, #7c3aed22);
          border: 1px solid rgba(167,139,250,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          margin-bottom: 24px;
        }
        .feature-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 12px;
          color: #f5f0eb;
        }
        .feature-desc {
          font-size: 15px;
          color: rgba(245,240,235,0.45);
          line-height: 1.7;
        }

        .footer-link:hover { color: #a78bfa; }
        .social-icon-new:hover {
          background: linear-gradient(135deg, #a78bfa, #7c3aed) !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(124,58,237,0.4);
        }

        .divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 60px 0;
        }
      `}</style>

      {/* Navbar */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "24px 60px", background: "rgba(10,10,15,0.8)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        position: "sticky", top: 0, zIndex: 1000,
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "10px",
            background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "800", color: "white"
          }}>J</div>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#f5f0eb", letterSpacing: "0.5px" }}>JobPortal</span>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link to="/login">
            <button className="nav-link-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="signup-pill">Get Started</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: "92vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "80px 24px", position: "relative", overflow: "hidden"
      }}>
        {/* Orbs */}
        <div className="orb" style={{ width: 600, height: 600, background: "rgba(124,58,237,0.15)", top: -200, left: -200 }} />
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(244,114,182,0.1)", bottom: -100, right: -100 }} />

        <div className="hero-badge">
          <span></span>
          Now live — 50,000+ opportunities
        </div>

        <h1 className="hero-title">
          Find your<br /><em>dream job.</em><br />Land it.
        </h1>
        <p className="hero-sub">
          Connect with world-class companies. Build a career that actually means something.
        </p>
        <div className="hero-cta-wrap">
          <Link to="/register">
            <button className="hero-cta">Start for free →</button>
          </Link>
          <span className="hero-secondary">No credit card needed</span>
        </div>

        {/* Stats Row */}
        <div style={{
          display: "flex", gap: "60px", marginTop: "100px",
          padding: "40px 60px", borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap", justifyContent: "center"
        }}>
          {[["50K+", "Active Jobs"], ["12K+", "Companies"], ["98%", "Match Rate"], ["4.9★", "Candidate Rating"]].map(([num, label]) => (
            <div className="stat-item" key={label}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <p style={{ fontSize: "13px", color: "#a78bfa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px", fontWeight: "600" }}>Why Us</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: "400", lineHeight: "1.1" }}>
            Built for people who<br /><em style={{ fontStyle: "italic", color: "rgba(245,240,235,0.5)" }}>mean business</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {[
            { icon: "🏢", title: "Top-tier Companies", desc: "Partner companies range from hot startups to Fortune 500 leaders, all actively hiring." },
            { icon: "⚡", title: "One-Click Apply", desc: "Apply to multiple roles instantly. Your profile does the heavy lifting." },
            { icon: "🎯", title: "Smart Matching", desc: "Our algorithm surfaces roles that match your exact skills, salary range, and ambition." },
            { icon: "📈", title: "Career Analytics", desc: "Track application success, benchmark your profile, and know your market value." },
            { icon: "🔔", title: "Real-time Alerts", desc: "Get notified the moment a matching role drops — before the competition." },
            { icon: "🤝", title: "Direct Recruiter Access", desc: "Message hiring managers directly. Skip the noise, make real connections." },
          ].map((f) => (
            <div className="feature-card-new" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        margin: "0 24px 100px", borderRadius: "32px",
        background: "linear-gradient(135deg, #3b0764, #1e1b4b)",
        border: "1px solid rgba(167,139,250,0.2)",
        padding: "80px 60px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(167,139,250,0.2)", top: -100, left: "50%", transform: "translateX(-50%)" }} />
        <p style={{ fontSize: "13px", color: "#c4b5fd", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: "600" }}>Join Today</p>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "400", marginBottom: "20px", lineHeight: 1.1 }}>
          Your next chapter<br />starts here.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "40px", fontSize: "16px" }}>
          Join 200,000+ professionals who found their place.
        </p>
        <Link to="/register">
          <button className="signup-pill" style={{ padding: "18px 52px", fontSize: "15px", fontWeight: "700" }}>
            Create Free Account →
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "60px 60px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "0 auto", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "10px",
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: "800", color: "white"
              }}>J</div>
              <span style={{ fontSize: "18px", fontWeight: "700" }}>JobPortal</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "15px", lineHeight: "1.7", maxWidth: "280px" }}>
              Your gateway to meaningful work. Connecting ambition with opportunity since 2024.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
                <a key={i} href="#" className="social-icon-new" style={{
                  color: "#fff", background: "rgba(255,255,255,0.07)",
                  width: 40, height: 40, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s ease", fontSize: "14px", textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>Platform</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Login", "Sign Up", "Browse Jobs", "Companies"].map(l => (
                <li key={l}>
                  <Link to={l === "Login" ? "/login" : "/register"} className="footer-link" style={{ textDecoration: "none", color: "rgba(255,255,255,0.5)", fontSize: "15px", transition: "color 0.3s" }}>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>Company</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {["About Us", "Blog", "Careers", "Privacy"].map(l => (
                <li key={l}>
                  <a href="#" className="footer-link" style={{ textDecoration: "none", color: "rgba(255,255,255,0.5)", fontSize: "15px", transition: "color 0.3s" }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider" />
        <p style={{ textAlign: "center", fontSize: "14px", color: "rgba(255,255,255,0.2)" }}>
          © 2026 JobPortal. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;