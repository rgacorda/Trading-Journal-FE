type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  data?: unknown;
  params?: Record<string, string>;
  isFormData?: boolean; // New flag for FormData
}

export const http = {
  async request<T = unknown>(url: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', headers = {}, data, params, isFormData = false } = config;

    // Add query params if provided
    let finalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      finalUrl += `?${queryString}`;
    }

    // Determine content type and body
    const contentType = isFormData ? undefined : 'application/json';
    const body = isFormData ? (data as FormData) : (data ? JSON.stringify(data) : undefined);

    const response = await fetch(finalUrl, {
      method,
      headers: {
        ...(contentType && { 'Content-Type': contentType }), // Only set if not FormData
        ...headers,
      },
      credentials: 'include',
      body,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Request failed');
    }

    return response.json() as Promise<T>;
  },

  // Updated post method to accept isFormData
  post<T = unknown>(url: string, data?: unknown, isFormData: boolean = false) {
    return this.request<T>(url, { method: 'POST', data, isFormData });
  },

  // Keep other methods unchanged
  get<T = unknown>(url: string, params?: Record<string, string>) {
    return this.request<T>(url, { method: 'GET', params });
  },

  put<T = unknown>(url: string, data?: unknown) {
    return this.request<T>(url, { method: 'PUT', data });
  },

  patch<T = unknown>(url: string, data?: unknown) {
    return this.request<T>(url, { method: 'PATCH', data });
  },

  delete<T = unknown>(url: string) {
    return this.request<T>(url, { method: 'DELETE' });
  },
};