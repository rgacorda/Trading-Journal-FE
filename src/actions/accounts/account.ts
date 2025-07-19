import api from "@/lib/axios";
import { AxiosError } from "axios";

const handleAxiosError = (error: unknown, fallbackMessage: string) => {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error(fallbackMessage, axiosError.response?.data || axiosError.message);
    throw new Error(axiosError.response?.data?.message || fallbackMessage);
  }

  console.error(fallbackMessage, (error as Error).message);
  throw new Error(fallbackMessage);
};

export const getAccounts = async () => {
  try {
    const res = await api.get("/account/");
    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, "Get accounts failed");
  }
};

export type Account = {
  name: string;
  balance: number;
  userId: string;
  id: string;
};

type createAccount = {
  name: string;
  balance: number;
};

export const createAccount = async (data: createAccount) => {
  try {
    const res = await api.post("/account/", data);
    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, "Create account failed");
  }
};

export const getAccountById = async (id: string | null) => {
  if (!id) return;
  try {
    const res = await api.get(`/account/${id}`);
    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, "Get account failed");
  }
};

export const updateAccount = async (id: string | null, data: createAccount) => {
  if (!id) return;
  try {
    const res = await api.put(`/account/${id}`, data);
    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, "Edit account failed");
  }
};

export const deleteAccount = async (id: string | null) => {
  if (!id) return;
  try {
    const res = await api.delete(`/account/${id}`);
    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error, "Delete account failed");
  }
};
