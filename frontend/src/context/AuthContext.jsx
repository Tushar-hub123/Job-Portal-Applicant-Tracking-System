// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [role, setRole] = useState(localStorage.getItem("role"));

//   const login = (token, role) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("role", role);
//     setRole(role);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ role, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(
    () => localStorage.getItem("role")
  );

  // Login function
  const login = (token, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);

    setRole(userRole);

    // Notify chatbot about login
    window.dispatchEvent(new Event("authChanged"));
  };

  // Logout function
  const logout = () => {
    // Remove authentication data only
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setRole(null);

    // Notify chatbot about logout
    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
