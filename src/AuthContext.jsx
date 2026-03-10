import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    const login = useCallback(async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      setAccessToken(response.data.accessToken);
      setUser(response.data.user);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
    } finally {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  }, []);

  const register = useCallback(
    async (email, password) => {
      try {
        if (!email?.trim() || !password) {
          throw new Error("Email and password are required");
        }
        await api.post("/auth/register", { email, password });
        return await login(email, password);
      } catch (error) {
        console.error("Register error:", error);
        throw error;
      }
    },
    [login]
  );

  const refreshToken = useCallback(async () => {
    const response = await api.post("/auth/refresh");
    setAccessToken(response.data.accessToken);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data.accessToken;
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    if (token) setAccessToken(token);

    (async () => {
      try {
        await refreshToken();
      } catch {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isLoading, login, logout, register, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

