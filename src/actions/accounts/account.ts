import api from "@/lib/axios";

export const getAccounts = async () => {
  try {
    const res = await api.get("/account/");
    return res.data;
  } catch (error: any) {
    console.error(
      "Get accounts failed:",
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || "Get accounts failed");
  }
};

type createAccount = {
  name: string;
  balance: number;
  // platform: string;
};

export const createAccount = async (data: createAccount) => {
  try {
    const res = await api.post("/account/", data);
    return res.data;
  } catch (error: any) {
    console.error(
      "Create account failed:",
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || "Create account failed");
  }
}

export const getAccountById = async (id: string | null) => {
  if (!id) return;
  try {
    const res = await api.get(`/account/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Get account failed:",
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || "Get account failed");
  }
}

export const updateAccount = async (id: string | null, data: createAccount) => {
  if (!id) return;
  try {
    const res = await api.put(`/account/${id}`, data);
    return res.data;
  } catch (error: any) {
    console.error(
      "Edit account failed:",
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || "Edit account failed");
  }
}

export const deleteAccount = async (id: string | null) => {
  if (!id) return;
  try {
    const res = await api.delete(`/account/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Delete account failed:",
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || "Delete account failed");
  }
}