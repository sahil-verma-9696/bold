import { apiRequest } from "../../utils/apiHelper";

export async function getAllUsers() {
  const response = await apiRequest("/api/user", "GET");
  return response.payload;
}

export async function sendFriendRequest(receiverId) {
  const response = await apiRequest(
    `/api/user/friend-request/${receiverId}`,
    "POST"
  );
  return response.payload;
}

export async function acceptFriendRequest(receiverId) {
  const response = await apiRequest(
    `/api/user/accept-request/${receiverId}`,
    "POST"
  );
  return response.payload;
}
export async function rejectFriendRequest(receiverId) {
  const response = await apiRequest(
    `/api/user/reject-request/${receiverId}`,
    "POST"
  );
  return response.payload;
}
