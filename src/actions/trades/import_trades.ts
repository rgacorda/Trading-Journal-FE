import api from "@/lib/axios";

type ImportTrades = {
  platform: string;
  file: File;
  user: string | undefined;
};

export const ImportTradesService = {
  importTrades: (data: ImportTrades) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("platform", data.platform);
    formData.append("user", data.user || "");

    return api.post("/trade/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
