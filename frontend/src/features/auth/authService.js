import { apiRequest } from "../../utils/apiHelper";

export async function loginUser(credentials) {
  const response = await apiRequest("/api/auth/login", "POST", credentials);
  return response.payload;
}

export async function logoutUser() {
  const response = await apiRequest("/api/auth/logout", "GET");
  return response.payload;
}

export async function signupUser(credentials) {
  const response = await apiRequest("/api/auth/signup", "POST", credentials);
  return response.payload;
}

export async function getMe() {
  const response = await apiRequest("/api/user/me", "GET");
  return response.payload;
}

export async function forgotPassword(data) {
  const response = await apiRequest("/api/auth/forgot-password", "POST", data);
  return response;
}

export async function resetPassword(data) {
  const response = await apiRequest("/api/auth/reset-password", "POST", data);
  return response;
}

