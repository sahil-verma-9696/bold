import toast from "react-hot-toast";

export default function validateAuthForm({ email, password }) {
  if (!email || !password) {
    toast.error("All fields are required");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Invalid email address");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
