import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registered Successfully");
      navigate("/login");

    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (

    <div style={container}>

      <div style={card}>

        <h2 style={{marginBottom:"20px"}}>Create Account</h2>

        <form onSubmit={handleRegister} style={formStyle}>

          <input
            placeholder="Name"
            required
            style={input}
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            placeholder="Email"
            required
            style={input}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            required
            style={input}
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <select
            style={input}
            onChange={(e)=>setForm({...form,role:e.target.value})}
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button type="submit" style={registerBtn}>
            Register
          </button>

        </form>

        <p style={{marginTop:"15px"}}>
          Already have account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;


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

const registerBtn = {
  padding:"12px",
  border:"none",
  background:"#4f46e5",
  color:"white",
  borderRadius:"6px",
  cursor:"pointer"
}