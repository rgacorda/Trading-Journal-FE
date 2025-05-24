import api from "@/lib/axios";

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
};

export async function Register(data: RegisterCredentials) {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (error: any) {
    console.error("Registration failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Registration failed");
  }
}

export async function Login(data: LoginCredentials) {
  try {
    const res = await api.post("/auth/login", data, { withCredentials: true });
    return res.data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Login failed");
  }
}

export async function Logout() {
  try {
    const res = await api.post("/auth/logout", {}, { withCredentials: true });
    return res.data;
  } catch (error: any) {
    console.error("Logout failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Logout failed");
  }
}

