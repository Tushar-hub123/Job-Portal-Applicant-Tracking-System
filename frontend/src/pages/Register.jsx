import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ role: "candidate" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const validateField = (field, value, currentErrors = errors) => {
    const newErrors = { ...currentErrors };
    if (field === "name") {
      if (!value || value.trim().length < 2) newErrors.name = "Enter your full name";
      else delete newErrors.name;
    }
    if (field === "email") {
      if (!value) newErrors.email = "Email is required";
      else if (!isValidEmail(value)) newErrors.email = "Enter a valid email (you@example.com)";
      else delete newErrors.email;
    }
    if (field === "password") {
      if (!value) newErrors.password = "Password is required";
      else if (!isStrongPassword(value))
        newErrors.password = "Min 8 chars · uppercase · lowercase · number · special char";
      else delete newErrors.password;
    }
    return newErrors;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (touched[field]) {
      setErrors(validateField(field, value));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateField(field, form[field]));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    let allErrors = validateField("name", form.name, {});
    allErrors = validateField("email", form.email, allErrors);
    allErrors = validateField("password", form.password, allErrors);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (error) {
      setErrors({ server: "Registration failed. Please try again." });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = form.role || "candidate";

  const getPasswordStrength = (password = "") => {
    if (!password) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    if (score <= 2) return { score, label: "Weak", color: "#f87171" };
    if (score === 3) return { score, label: "Fair", color: "#fbbf24" };
    if (score === 4) return { score, label: "Good", color: "#34d399" };
    return { score, label: "Strong", color: "#a78bfa" };
  };
  const pwStrength = getPasswordStrength(form.password);

  return (
    <div style={{
      fontFamily: "'Syne', sans-serif",
      minHeight: "100vh",
      display: "flex",
      background: "#0a0a0f",
      overflow: "hidden",
      color: "#f5f0eb"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-input {
          width: 100%;
          padding: 15px 20px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          color: #f5f0eb;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          transition: all 0.3s ease;
          outline: none;
        }
        .reg-input::placeholder { color: rgba(255,255,255,0.2); }
        .reg-input:focus {
          border-color: rgba(167,139,250,0.55);
          background: rgba(167,139,250,0.04);
          box-shadow: 0 0 0 4px rgba(167,139,250,0.09);
        }
        .reg-input.has-error {
          border-color: rgba(248,113,113,0.5);
          background: rgba(248,113,113,0.03);
          box-shadow: 0 0 0 4px rgba(248,113,113,0.07);
        }
        .reg-input.is-valid {
          border-color: rgba(52,211,153,0.4);
        }

        .role-card {
          flex: 1;
          padding: 20px 14px;
          border-radius: 16px;
          border: 1.5px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          user-select: none;
        }
        .role-card.active {
          border-color: #a78bfa;
          background: rgba(167,139,250,0.09);
          box-shadow: 0 0 0 4px rgba(167,139,250,0.07), 0 12px 30px rgba(124,58,237,0.12);
        }
        .role-card:hover:not(.active) {
          border-color: rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.05);
          transform: translateY(-1px);
        }

        .submit-btn {
          width: 100%;
          padding: 17px;
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
          box-shadow: 0 16px 40px rgba(124,58,237,0.35);
          position: relative;
          overflow: hidden;
        }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 24px 50px rgba(124,58,237,0.45); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        .orb { position: absolute; border-radius: 50%; filter: blur(110px); pointer-events: none; }

        .error-msg {
          font-size: 12px;
          color: #f87171;
          margin-top: 7px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 500;
        }
        .success-msg {
          font-size: 12px;
          color: #34d399;
          margin-top: 7px;
          font-weight: 500;
        }

        .pw-bar {
          flex: 1;
          height: 3px;
          border-radius: 100px;
          transition: background 0.4s ease;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.32);
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .progress-bar {
          height: 3px;
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 44px;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #a78bfa, #7c3aed);
          border-radius: 100px;
          width: 50%;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fu  { animation: fadeUp 0.55s ease both; }
        .fu1 { animation-delay: 0.05s; }
        .fu2 { animation-delay: 0.10s; }
        .fu3 { animation-delay: 0.15s; }
        .fu4 { animation-delay: 0.20s; }
        .fu5 { animation-delay: 0.25s; }
        .fu6 { animation-delay: 0.30s; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 56px",
        position: "relative",
        overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div className="orb" style={{ width: 520, height: 520, background: "rgba(124,58,237,0.12)", top: -130, left: -160 }} />
        <div className="orb" style={{ width: 380, height: 380, background: "rgba(244,114,182,0.07)", bottom: -80, right: -80 }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "11px",
            background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", fontWeight: "800", color: "white"
          }}>J</div>
          <span style={{ fontSize: "19px", fontWeight: "700" }}>JobPortal</span>
        </div>

        {/* Headline + steps */}
        <div>
          <p style={{ fontSize: "12px", color: "#a78bfa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "18px", fontWeight: "600" }}>
            Join 200,000+ members
          </p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(30px, 3vw, 46px)",
            fontWeight: "400", lineHeight: "1.15",
            marginBottom: "44px"
          }}>
            Build the career<br />
            <em style={{ fontStyle: "italic", color: "rgba(245,240,235,0.38)" }}>you deserve.</em>
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { num: "01", title: "Create your profile", desc: "Tell us about your skills and goals" },
              { num: "02", title: "Discover matches", desc: "Curated listings tailored to you" },
              { num: "03", title: "Apply & connect", desc: "Reach hiring managers directly" },
            ].map((step, i) => (
              <div key={step.num} style={{ display: "flex", gap: "18px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                    background: i === 0 ? "linear-gradient(135deg, #a78bfa, #7c3aed)" : "rgba(255,255,255,0.05)",
                    border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.09)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: "700",
                    color: i === 0 ? "white" : "rgba(255,255,255,0.28)"
                  }}>{step.num}</div>
                  {i < 2 && <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.06)", minHeight: "36px" }} />}
                </div>
                <div style={{ paddingBottom: i < 2 ? "28px" : 0, paddingTop: "8px" }}>
                  <div style={{ fontWeight: "600", fontSize: "14px", color: i === 0 ? "#f5f0eb" : "rgba(255,255,255,0.33)", marginBottom: "3px" }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ display: "flex" }}>
            {["A","B","C","D","E"].map((l, i) => (
              <div key={l} style={{
                width: 34, height: 34, borderRadius: "50%",
                background: `linear-gradient(135deg, hsl(${i*55+250},65%,60%), hsl(${i*55+275},65%,44%))`,
                border: "2px solid #0a0a0f",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: "700", color: "white",
                marginLeft: i === 0 ? 0 : "-9px"
              }}>{l}</div>
            ))}
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
            <strong style={{ color: "#f5f0eb" }}>2,400+</strong> joined this week
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{
        width: "100%", maxWidth: "520px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "56px 52px", position: "relative", overflowY: "auto"
      }}>
        <div className="orb" style={{ width: 280, height: 280, background: "rgba(167,139,250,0.06)", top: -40, right: -80 }} />

        <div className="progress-bar"><div className="progress-fill" /></div>

        {/* Heading */}
        <div className="fu">
          <p style={{ fontSize: "12px", color: "#a78bfa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontWeight: "600" }}>Get started</p>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "38px", fontWeight: "400", marginBottom: "8px" }}>Create account</h1>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px", marginBottom: "32px" }}>
            Already a member?{" "}
            <Link to="/login" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: "600" }}>Sign in →</Link>
          </p>
        </div>

        {/* Server error banner */}
        {errors.server && (
          <div style={{
            padding: "12px 16px", borderRadius: "12px", marginBottom: "16px",
            background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)",
            fontSize: "13px", color: "#f87171", fontWeight: "500"
          }}>⚠ {errors.server}</div>
        )}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

          {/* Role Toggle */}
          <div className="fu fu1">
            <label className="form-label">I am a</label>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { val: "candidate", icon: "👤", label: "Candidate", sub: "Looking for work" },
                { val: "recruiter", icon: "🏢", label: "Recruiter", sub: "Hiring talent" },
              ].map((r) => (
                <div
                  key={r.val}
                  className={`role-card ${selectedRole === r.val ? "active" : ""}`}
                  onClick={() => setForm({ ...form, role: r.val })}
                >
                  <div style={{ fontSize: "26px", marginBottom: "8px" }}>{r.icon}</div>
                  <div style={{
                    fontWeight: "700", fontSize: "14px", marginBottom: "3px",
                    color: selectedRole === r.val ? "#c4b5fd" : "rgba(255,255,255,0.42)"
                  }}>{r.label}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>{r.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="fu fu2">
            <label className="form-label">Full Name</label>
            <input
              placeholder="Rahul Mehta"
              required
              className={`reg-input ${touched.name ? (errors.name ? "has-error" : form.name ? "is-valid" : "") : ""}`}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
            />
            {touched.name && errors.name && <div className="error-msg">⚡ {errors.name}</div>}
            {touched.name && !errors.name && form.name && <div className="success-msg">✓ Looks good</div>}
          </div>

          {/* Email */}
          <div className="fu fu3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className={`reg-input ${touched.email ? (errors.email ? "has-error" : form.email ? "is-valid" : "") : ""}`}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
            />
            {touched.email && errors.email && <div className="error-msg">⚡ {errors.email}</div>}
            {touched.email && !errors.email && form.email && <div className="success-msg">✓ Valid email</div>}
          </div>

          {/* Password */}
          <div className="fu fu4">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              required
              className={`reg-input ${touched.password ? (errors.password ? "has-error" : form.password ? "is-valid" : "") : ""}`}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
            />

            {/* Strength bars */}
            {form.password && (
              <div style={{ marginTop: "10px" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "7px" }}>
                  {[1,2,3,4,5].map((s) => (
                    <div key={s} className="pw-bar" style={{
                      background: s <= pwStrength.score ? pwStrength.color : "rgba(255,255,255,0.07)"
                    }} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)", lineHeight: 1.5 }}>
                    uppercase · lowercase · number · special char
                  </div>
                  {pwStrength.label && (
                    <div style={{ fontSize: "12px", fontWeight: "700", color: pwStrength.color }}>
                      {pwStrength.label}
                    </div>
                  )}
                </div>
              </div>
            )}
            {touched.password && errors.password && <div className="error-msg">⚡ {errors.password}</div>}
            {touched.password && !errors.password && form.password && <div className="success-msg">✓ Strong password</div>}
          </div>

          {/* Submit */}
          <div className="fu fu5" style={{ marginTop: "4px" }}>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading
                ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px" }}>
                    <span className="spinner" /> Creating account...
                  </span>
                : "Create my account →"
              }
            </button>
          </div>

          {/* Terms */}
          <div className="fu fu6" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.17)", lineHeight: 1.6 }}>
              By continuing you agree to our{" "}
              <a href="#" style={{ color: "rgba(167,139,250,0.5)", textDecoration: "none" }}>Terms of Service</a>
              {" "}and{" "}
              <a href="#" style={{ color: "rgba(167,139,250,0.5)", textDecoration: "none" }}>Privacy Policy</a>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Register;