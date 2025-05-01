import { useDispatch, useSelector } from "react-redux";
import UserListItem from "../../ui/UserListItem";
import { EmptyState } from "./EmptyState";

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
        {requests.map((pending) => (
          <UserListItem
            type="request"
            key={pending._id}
            user={pending}
            css="hover:bg-gray-800 p-2 rounded"
          />
        ))}
      </ul>
    </main>
  );
}
