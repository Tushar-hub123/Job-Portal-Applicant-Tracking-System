import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function HomePage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", margin: 0, padding: 0 }}>
      
      {/* Navbar */}
      <nav style={navStyle}>
        <h2 style={{ color: "#4f46e5", fontWeight: "700", fontSize: "28px" }}>JobPortal</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/login">
            <button style={loginBtn}>Login</button>
          </Link>
          <Link to="/register">
            <button style={signupBtn}>Sign Up</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={heroSection}>
        <h1 style={title}>
          Find Your <span style={{ color: "#4f46e5" }}>Dream Job</span>
        </h1>
        <p style={subtitle}>
          Connect with top companies and build your career
        </p>
        <Link to="/register">
          <button style={heroBtn}>Get Started</button>
        </Link>
      </section>

      {/* Features Section */}
      <section style={featuresSection}>
        <h2 style={featuresTitle}>Why Choose Us?</h2>
        <div style={featuresGrid}>
          <div style={featureCard}>
            <h3>Top Companies</h3>
            <p>Get access to the best companies looking for talent.</p>
          </div>
          <div style={featureCard}>
            <h3>Easy Application</h3>
            <p>Apply to multiple jobs with just a few clicks.</p>
          </div>
          <div style={featureCard}>
            <h3>Career Growth</h3>
            <p>Find jobs that match your skillset and ambitions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={footer}>
        <div style={footerContainer}>

          <div style={footerSection}>
            <h3>JobPortal</h3>
            <p>Your gateway to your dream career. Connecting top talent with top companies.</p>
          </div>

          <div style={footerSection}>
            <h4>Quick Links</h4>
            <ul style={footerLinks}>
              <li><Link style={linkStyle} to="/">Home</Link></li>
              <li><Link style={linkStyle} to="/login">Login</Link></li>
              <li><Link style={linkStyle} to="/register">Sign Up</Link></li>
            </ul>
          </div>

          <div style={footerSection}>
            <h4>Follow Us</h4>
            <div style={socialIcons}>
              <a href="#" style={socialLink}><FaFacebookF /></a>
              <a href="#" style={socialLink}><FaTwitter /></a>
              <a href="#" style={socialLink}><FaLinkedinIn /></a>
              <a href="#" style={socialLink}><FaInstagram /></a>
            </div>
          </div>

          

        </div>

        <p style={footerBottom}>© 2026 JobPortal. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default HomePage;

/* ---------- Styles ---------- */

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 60px",
  background: "#fff",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  position: "sticky",
  top: 0,
  zIndex: 1000
};

const loginBtn = {
  padding: "10px 20px",
  border: "2px solid #4f46e5",
  background: "transparent",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  color: "#4f46e5",
  transition: "0.3s",
};
const signupBtn = {
  padding: "10px 20px",
  border: "none",
  background: "#4f46e5",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  transition: "transform 0.2s ease",
};

const heroSection = {
  height: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #eef2ff, #f0f4ff)",
  textAlign: "center",
  padding: "0 20px"
};
const title = { fontSize: "52px", fontWeight: "700", marginBottom: "15px", lineHeight: "1.2" };
const subtitle = { fontSize: "20px", color: "#6b7280", marginBottom: "30px" };
const heroBtn = {
  padding: "16px 36px",
  fontSize: "16px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)",
  transition: "all 0.3s ease"
};

const featuresSection = { padding: "80px 20px", background: "#f8fafc", textAlign: "center" };
const featuresTitle = { fontSize: "36px", fontWeight: "700", marginBottom: "40px" };
const featuresGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
  maxWidth: "1000px",
  margin: "0 auto"
};
const featureCard = {
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer"
};

/* ---------- Footer Styles ---------- */

const footer = {
  background: "#1f2937",
  color: "#d1d5db",
  padding: "60px 20px 20px 20px",
  marginTop: "50px"
};

const footerContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "40px",
  maxWidth: "1200px",
  margin: "0 auto"
};

const footerSection = { lineHeight: "1.8" };

const footerLinks = { listStyle: "none", padding: 0 };

const linkStyle = { textDecoration: "none", color: "#d1d5db", transition: "0.3s" };

const socialIcons = { display: "flex", gap: "15px", marginTop: "10px" };

const socialLink = {
  color: "#fff",
  background: "#4f46e5",
  padding: "10px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.3s",
  fontSize: "14px"
};

const newsletterInput = {
  padding: "10px",
  borderRadius: "6px 0 0 6px",
  border: "none",
  outline: "none",
  flex: 1
};

const newsletterBtn = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "0 6px 6px 0",
  background: "#4f46e5",
  color: "#fff",
  cursor: "pointer",
  transition: "0.3s"
};

const footerBottom = {
  textAlign: "center",
  paddingTop: "20px",
  fontSize: "14px",
  color: "#9ca3af"
};