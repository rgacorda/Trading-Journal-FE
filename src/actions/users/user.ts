"use server";
import api from "@/lib/axios";



export const getUser = async () => {
  try {
    const res = await api.get(`/user/`);
    return res.data;
  } catch (error: any) {
    console.error("Get user failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Get user failed");
  }
};
