import { useState, useEffect, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../Interfaces/IAuthContext";
import { refreshToken } from "../service/api";

function decode(token: string): boolean {
  if (!token) return false;

  const parts = token.split(".");

  if (parts.length !== 3) return false;

  const payload = atob(parts[1]);
  const decodedPayload = JSON.parse(payload);

  const exp = decodedPayload.exp;
  const expirationTime = exp * 1000;
  const currentTime = Date.now();

  if (currentTime >= expirationTime) return false;

  return true;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthenticated(false);
        navigate("/login");
        return;
      }
      const tokenValido = decode(token);

      if (tokenValido) {
        setAuthenticated(true);
      }

      const refreshed = await refreshToken();

      if (refreshed) {
        setAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        setAuthenticated(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};