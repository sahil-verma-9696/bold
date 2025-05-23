import { useDispatch, useSelector } from "react-redux";
import UserListItem from "../ui/UserListItem";
import { EmptyState } from "./EmptyState";
import { setRightPannelUser } from "../../redux/slices/rightPannel";

export function RequestList() {
  const requests = useSelector((store) => store.user.requests);
  const dispatch = useDispatch();

  if (!requests || requests.length === 0) {
    return (
      <EmptyState
        title="No Friend Requests"
        subtitle="Looks like no one sent you a request yet."
      />
    );
  }

  return (
    <main>
      <ul className="flex flex-col gap-2 mt-2">
        {requests.map((request) => (
          <UserListItem
            onClick={() => dispatch(setRightPannelUser(request))}
            type="request"
            key={request._id}
            user={request}
            css="hover:bg-gray-800 p-2 rounded"
          />
        ))}
      </ul>
    </main>
  );
}
