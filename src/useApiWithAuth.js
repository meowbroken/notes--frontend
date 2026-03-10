import { useMemo } from "react";
import { api } from "./api";
import { useAuth } from "./AuthContext.jsx";

export const useApiWithAuth = () => {
  const { accessToken, refreshToken } = useAuth();

  const client = useMemo(() => {
    const instance = api;

    instance.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
        if (
          (error.response?.status === 401 || error.response?.status === 403) &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          const newToken = await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [accessToken, refreshToken]);

  return client;
};