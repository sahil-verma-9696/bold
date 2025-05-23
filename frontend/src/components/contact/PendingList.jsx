import { useDispatch, useSelector } from "react-redux";
import { EmptyState } from "./EmptyState";
import UserListItem from "../ui/UserListItem";
import { setRightPannelUser } from "../../redux/slices/rightPannel";

export function PendingList() {
  const pendings = useSelector((store) => store.user.pendings);
  const dispatch = useDispatch();

  if (!pendings || pendings.length === 0) {
    return (
      <EmptyState
        title="No Pending Requests"
        subtitle="You have no pending friend requests."
      />
    );
  }

  return (
    <main>
      <ul className="flex flex-col gap-2 mt-2">
        {pendings.map((pending) => (
          <UserListItem
            onClick={() => dispatch(setRightPannelUser(pending))}
            type="pending"
            key={pending._id}
            user={pending}
            css="hover:bg-gray-800 p-2 rounded"
          />
        ))}
      </ul>
    </main>
  );
}
