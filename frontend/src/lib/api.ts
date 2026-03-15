import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
});

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<{ error?: string }>(error)) {
    return error.response?.data?.error ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};
