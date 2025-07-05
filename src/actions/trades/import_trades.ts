import api from "@/lib/axios";

type ImportTrades = {
  platform: string;
  file: File;
  account: string;
  date: Date|undefined;
};

export const ImportTradesService = {
  importTrades: (data: ImportTrades) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("platform", data.platform);
    formData.append("accountId", data.account);
    formData.append("date", data.date ? data.date.toISOString() : '');

    return api.post("/trade/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
