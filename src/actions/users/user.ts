"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import api from "@/lib/axios";

interface User {
  id: string;
  email: string;
  role: string;
}
export const getToken = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (token) {
    const decodedToken = jwt.decode(token) as User;
    return decodedToken;
  } else {
    return null;
  }
};

export const getUser = async () => {
  try {
    const token = await getToken();
    const res = await api.get(`/user/${token?.id}`, {});

    return res.data;
  } catch (error: any) {
    console.error("Get user failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Get user failed");
  }
};
