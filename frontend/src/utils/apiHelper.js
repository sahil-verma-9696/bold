import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

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

    // Switch statement to handle different error types
    switch (true) {
      case error.message === "Failed to fetch":
        // Handle specific cases for "Failed to fetch"
        if (!navigator.onLine) {
          toast.error("🌍 No internet connection detected.");
        } else if (
          API_BASE_URL.includes("http://") &&
          window.location.protocol === "https:"
        ) {
          toast.error(
            "🔐 Mixed content error. The server is using HTTP instead of HTTPS."
          );
        } else if (error.stack?.includes("CORS")) {
          toast.error(
            "🔒 CORS issue: The server is not allowing requests from this origin."
          );
        } else {
          // For other potential issues like server being down or incorrect URL/port
          toast.error(
            "❌ Server is down or unreachable. Please try again later."
          );
        }
        break;

      // Default case for other errors
      default:
        toast.error(error.message || "Something went wrong.");
        break;
    }

    throw error;
  }
}
