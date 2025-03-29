import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000";

/**
 * Generic function to make API calls with error handling & toast messages.
 */
export async function apiRequest(endpoint, method, body) {
  let loadingToastId = null;

  try {
    // Show loading toast
    loadingToastId = toast.loading("Connecting to the server...");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include", // for exchanging secured cookies
      body: body ? JSON.stringify(body) : undefined,
    });

    // Parse response JSON safely
    const data = await response.json().catch(() => {
      throw new Error("Invalid response from server.");
    });

    // Dismiss loading toast
    toast.dismiss(loadingToastId);

    if (!response.ok || data.type === "error") {
      throw new Error(data.message || "Request failed. Please try again.");
    }

    // Show success toast
    toast.success(data.message || "Request successful!");

    return data;
  } catch (error) {
    toast.dismiss(loadingToastId);
    toast.error(error.message || "Something went wrong.");
    throw error;
  }
}