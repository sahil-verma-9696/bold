import { useSelector } from "react-redux";
import { EmptyState } from "./EmptyState";
import UserListItem from "../../ui/UserListItem";

export function FriendsList() {
  const friends = useSelector((store) => store.user.friends);

  if (!friends || friends.length === 0) {
    return (
      <EmptyState
        title="No Friends Yet"
        subtitle="You haven't added anyone yet."
      />
    );
  }

  return (
    <main>
      <ul className="flex flex-col gap-2 mt-2">
        {friends.map((friend) => (
          <UserListItem
            key={friend._id}
            user={friend}
            css="hover:bg-gray-800 p-2 rounded"
          />
        ))}
      </ul>
    </main>
  );
}
