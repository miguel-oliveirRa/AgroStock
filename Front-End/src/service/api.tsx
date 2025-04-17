import axios from "axios";
import { Product } from "../Types/Product";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5176/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (!response) {
      toast.error("Erro de conexão com o servidor.");
      return Promise.reject(error);
    }

    const status = response.status;
    const originalRequest = config;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        const refreshStatus = refreshError.response?.status;
        const refreshMessage =
          refreshError.response?.data?.message?.toLowerCase() || "";

        const isRefreshExpired =
          refreshStatus === 401 &&
          (refreshMessage.includes("expired") ||
            refreshMessage.includes("invalid"));

        if (isRefreshExpired) {
          toast.error("Sessão expirada. Faça login novamente.");
          localStorage.clear();
          window.location.href = "/login";
        } else {
          toast.error("Erro ao tentar renovar sessão.");
        }

        return Promise.reject(refreshError);
      }
    }

    if (status === 401 && originalRequest._retry) {
      toast.error("Você não está autorizado a fazer isso.");
    }

    if (status === 403) {
      toast.error("Acesso negado. Permissão insuficiente.");
    }

    if (status === 404) {
      toast.error("Recurso não encontrado.");
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.withCredentials = true;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const refreshToken = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.post("/auth/refresh");

    if (response?.data?.token) {
      localStorage.setItem("token", response.data.token);
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const loginService = async (credentials: {
  email: string;
  password: string;
}): Promise<Object> => {
  const response = await axiosInstance.post("/product/login", credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get("/product/getproducts");
  return response.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await axiosInstance.put(`product/updateproduct`, product);
  return response.data;
};

export const updateAmount = async (product: Product): Promise<void> => {
  const response = await axiosInstance.put(
    `/product/updateamount/${product.id}`,
    product
  );
  return response.data;
};

export const createProduct = async (product: {
  name: string;
  amount: number;
  category: string;
}): Promise<Product> => {
  const response = await axiosInstance.post("/product/createproduct", product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await axiosInstance.delete(`product/deleteproduct/${id}`);
  return response.data;
};
