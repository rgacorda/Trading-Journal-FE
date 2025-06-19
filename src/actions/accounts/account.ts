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