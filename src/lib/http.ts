type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  data?: unknown;
  params?: Record<string, string>;
}

export const http = {
  async request<T = unknown>(url: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', headers = {}, data, params } = config;

    // Add query params if provided
    let finalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      finalUrl += `?${queryString}`;
    }

    const response = await fetch(finalUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include', // Essential for cookies
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Request failed');
    }

    return response.json() as Promise<T>;
  },

  get<T = unknown>(url: string, params?: Record<string, string>) {
    return this.request<T>(url, { method: 'GET', params });
  },

  post<T = unknown>(url: string, data?: unknown) {
    return this.request<T>(url, { method: 'POST', data });
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