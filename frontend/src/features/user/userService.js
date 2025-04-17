import { apiRequest } from "../../utils/apiHelper";

export async function getAllUsers() {
  const response = await apiRequest("/api/user", "GET");
  return response.payload;
}
