import { apiRequest } from "../../utils/apiHelper";

export async function getAllUsers() {
  const response = await apiRequest("/api/user", "GET");
  return response.payload;
}

export async function sendFriendRequest(receiverId) {
  const response = await apiRequest(
    `/api/user/friend-request/${receiverId}`,
    "GET"
  );
  return response.payload;
}

export async function acceptFriendRequest(receiverId) {
  const response = await apiRequest(
    `/api/user/accept-request/${receiverId}`,
    "GET"
  );
  return response.payload;
}

export async function rejectFriendRequest(receiverId) {
  const response = await apiRequest(
    `/api/user/reject-request/${receiverId}`,
    "GET"
  );
  return response.payload;
}

export async function removeFriend(receiverId) {
  const response = await apiRequest(
    `/api/user/remove-friend/${receiverId}`,
    "GET"
  );
  return response.payload;
}

export async function search(queries) {
  const response = await apiRequest(`/api/user/search?q=${queries}`);
  return response.payload;
}

export async function getFriends() {
  const response = await apiRequest(`/api/user/friends`, "GET");
  return response.payload;
}

export async function getPendings() {
  const response = await apiRequest(`/api/user/pending`, "GET");
  return response.payload;
}

export async function getRequests() {
  const response = await apiRequest(`/api/user/requests`, "GET");
  return response.payload;
}
