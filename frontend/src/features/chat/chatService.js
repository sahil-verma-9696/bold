import { apiRequest } from "../../utils/apiHelper";

export async function getMessages(receiverId) {
  const response = await apiRequest(
    "/api/message?receiverId=" + receiverId,
    "GET"
  );
  return response.payload;
}
