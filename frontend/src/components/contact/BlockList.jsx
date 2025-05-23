import { useSelector } from "react-redux";
import { EmptyState } from "./EmptyState";
import UserListItem from "../ui/UserListItem";

export function BlockedList() {
  const blocked = useSelector((store) => store.user.blocked);

  if (!blocked || blocked.length === 0) {
    return (
      <EmptyState
        title="No Blocked Users"
        subtitle="You have not blocked anyone yet."
      />
    );
  }

  return (
    <main>
      <ul className="flex flex-col gap-2 mt-2">
        {blocked.map((user) => (
          <UserListItem
            type="blocked"
            key={user._id}
            user={user}
            css="hover:bg-gray-800 p-2 rounded"
          />
        ))}
      </ul>
    </main>
  );
}
