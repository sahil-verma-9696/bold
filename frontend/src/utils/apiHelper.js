import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000";

/**
 * Generic function to make API calls with error handling & toast messages.
 */
export async function apiRequest(
  endpoint,
  method,
  body = null,
  isFormData = false
) {
  let loadingToastId = toast.loading("Connecting to the server...");

  try {
    const headers = isFormData ? {} : { "Content-Type": "application/json" };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      credentials: "include", // ✅ Handles secure cookies
      body:
        method === "GET"
          ? null
          : isFormData
          ? body
          : body
          ? JSON.stringify(body)
          : null,
    });

    // ✅ Attempt to parse JSON response safely
    const data = await response.json().catch(() => {
      throw new Error("Invalid response from server.");
    });

    // ✅ Dismiss loading toast before handling response
    toast.dismiss(loadingToastId);

    if (!response.ok || data?.type === "error") {
      throw new Error(data?.message || "Request failed. Please try again.");
    }

    // ✅ Show success toast if message exists
    if (data?.message) {
      toast.success(data.message);
    }

    return data;
  } catch (error) {
    toast.dismiss(loadingToastId);
    toast.error(error.message || "Something went wrong.");
    throw error;
  }
}
