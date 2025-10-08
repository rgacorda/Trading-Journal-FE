import api from "@/lib/axios";

type ImportTrades = {
  platform: string;
  file: File;
  account: string;
  date: Date | undefined;
  timezone?: string;
};

// Convert date to timezone-aware ISO string
const dateToTimezoneISO = (date: Date, timezone: string): string => {
  try {
    // Format the date in the user's timezone
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Create a date string in the format YYYY-MM-DD in the user's timezone
    // This ensures the backend receives the exact date the user selected
    return `${year}-${month}-${day}T00:00:00`;
  } catch (error) {
    console.error("Error converting date:", error);
    return date.toISOString();
  }
};

export const ImportTradesService = {
  importTrades: (data: ImportTrades) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("platform", data.platform);
    formData.append("accountId", data.account);

    if (data.date) {
      const dateString = dateToTimezoneISO(data.date, data.timezone || "UTC");
      formData.append("date", dateString);
    } else {
      formData.append("date", "");
    }

    if (data.timezone) {
      formData.append("timezone", data.timezone);
    }

    return api.post("/trade/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
