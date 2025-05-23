import { http } from "@/lib/http";

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

    return http.post("/trade/upload", formData, true);
  },
};
