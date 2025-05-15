import axios from "axios";

export function handleApiError(
  err: unknown,
  fallbackMessage = "Something went wrong"
) {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const message = err.response?.data?.message ?? err.message;

    if (status === 404) {
      throw new Error(message || "Resource not found");
    }

    throw new Error(message || `API Error (${status})`);
  }

  if (err instanceof Error) {
    throw new Error(err.message);
  }

  throw new Error(fallbackMessage);
}
