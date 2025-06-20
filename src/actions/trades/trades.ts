import api from "@/lib/axios";

export type Trade = {
  id: string;
  ticker: string;
  side: string;
  quantity: number;
  entry: number;
  exit: number;
  fees: number;
  setup: string;
  plan: string;
  grade: string;
  mistakes: string[];
  notes: string;
  date: string;
  time: string;
  realized: number;
  security: string;
  broker: string;
  plan_id: string;
  account_id: string;
};
export const getTrades = async () => {
  try {
    const res = await api.get("/trade/");
    return res.data;
  } catch (error: any) {
    console.error("Get trades failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Get trades failed");
  }
};

export const createTrade = async (data: Trade) => {
  try {
    const res = await api.post("/trade/", data);
    return res.data;
  } catch (error: any) {
    console.error(
      "Create trade failed:",
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || "Create trade failed");
  }
};

export const getTradebyId = async (id: string | null) => {
  if (!id) return;
  try {
    const res = await api.get(`/trade/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("Get trade failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Get trade failed");
  }
};

export const updateTrade = async (id: string | null, data: Trade) => {
  if (!id) return;
  try {
    const res = await api.put(`/trade/${id}`, data);
    return res.data;
  } catch (error: any) {
    console.error("Edit trade failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Edit trade failed");
  }
};

export const deleteTrades = async (ids: string[] | null) => {
  if (!ids) return;
  try {
    const res = await api.delete(`/trade/delete`, {
      data: {
        ids: ids,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error(
      "Delete trade failed:",
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || "Delete trade failed");
  }
};
