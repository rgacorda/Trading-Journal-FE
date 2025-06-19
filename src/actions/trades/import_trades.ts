import api from "@/lib/axios";

type ImportTrades = {
  platform: string;
  file: File;
};

export const ImportTradesService = {
  importTrades: (data: ImportTrades) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("platform", data.platform);

    return api.post("/trade/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
