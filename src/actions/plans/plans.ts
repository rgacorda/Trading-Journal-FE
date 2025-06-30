import api from "@/lib/axios";

export const getPlans = async () => {
  try {
    const res = await api.get("/plan/");
    return res.data;
  } catch (error: any) {
    console.error("Get plans failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Get plans failed");
  }
};

type Plan = {
  name: string;
//   content: string;
};

export const createPlan = async (data: Plan) => {
  try {
    const res = await api.post("/plan/", data);
    return res.data;
  } catch (error: any) {
    console.error("Create plan failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Create plan failed");
  }
};

export const getPlanById = async (id: string | null) => {
  if (!id) return;
  try {
    const res = await api.get(`/plan/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("Get plan failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Get plan failed");
  }
};

export const updatePlan = async (id: string | null, data: Plan) => {
  if (!id) return;
  try {
    const res = await api.put(`/plan/${id}`, data);
    return res.data;
  } catch (error: any) {
    console.error("Edit plan failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Edit plan failed");
  }
};

export const deletePlan = async (id: string | null) => {
  if (!id) return;
  try {
    const res = await api.delete(`/plan/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("Delete plan failed:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Delete plan failed");
  }
};