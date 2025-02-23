import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {
  loginRequest,
  registerRequest,
  registerAuditorRequest,
  verifyTokenRequest,
} from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 201) {
        //console.log("Usuario registrado exitosamente");
        return true; // Indicar éxito
      }
      return false; // Indicar fallo
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data); // Cambia esto para que sea un array
      return false; // Indicar fallo
    }
  };

  const signupAuditor = async (user) => {
    try {
      const res = await registerAuditorRequest(user);
      console.log(res)
      if (res.status === 201) {
        //console.log("Usuario registrado exitosamente");
        return true; // Indicar éxito
      }
      return false; // Indicar fallo
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data); // Cambia esto para que sea un array
      return false; // Indicar fallo
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        setErrors([
          "No se pudo conectar al servidor. Por favor, inténtelo de nuevo más tarde.",
        ]);
      } else {
        setErrors(error.response?.data?.message || ["Error desconocido"]);
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        //console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signupAuditor,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
