import API from "./api";

// GET
export const fetcher = async <T = any>(url: string): Promise<T> => {
  const res = await API.get<T>(url);
  return res.data;
};

// POST
export const poster = async <T = any>(url: string, data: any): Promise<T> => {
  const res = await API.post<T>(url, data);
  return res.data;
};

// PUT
export const putter = async <T = any>(url: string, data: any): Promise<T> => {
  const res = await API.put<T>(url, data);
  return res.data;
};

// PATCH
export const patcher = async <T = any>(url: string, data: any): Promise<T> => {
  const res = await API.patch<T>(url, data);
  return res.data;
};

// DELETE
export const deleter = async <T = any>(url: string): Promise<T> => {
  const res = await API.delete<T>(url);
  return res.data;
};
