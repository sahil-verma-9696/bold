import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserListItem from "../ui/UserListItem";
import { loadPendings, loadRequests } from "../../features/user/userSlice";

function Contacts() {
  const [activeHeader, setActiveHeader] = useState("Pending");

  return (
    <div className="flex flex-col h-full text-white p-4 overflow-y-auto">
      <Header activeHeader={activeHeader} setActiveHeader={setActiveHeader} />
      <div className="flex-1 mt-4">
        {activeHeader === "Pending" && <PendingList />}
        {activeHeader === "Friends" && <FriendsList />}
        {activeHeader === "Friend Requests" && <RequestList />}
        {activeHeader === "Blocked" && <BlockedList />}
      </div>
    </div>
  );
}

function Header({ activeHeader, setActiveHeader }) {
  const headers = ["Pending", "Friends", "Blocked", "Friend Requests"];

  return (
    <div className="flex gap-6 border-b border-gray-700 pb-2">
      {headers.map((header) => (
        <button
          key={header}
          className={`pb-1 text-lg font-semibold cursor-pointer ${
            activeHeader === header
              ? "border-b-2 border-white text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveHeader(header)}
        >
          {header}
        </button>
      ))}
    </div>
  );
}

function EmptyState({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-10 text-gray-400">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm mt-2">{subtitle}</p>
    </div>
  );
}

function FriendsList() {
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

function PendingList() {
  const pendings = useSelector((store) => store.user.pendings);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadPendings());
  // }, [dispatch]);

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

function RequestList() {
  const requests = useSelector((store) => store.user.requests);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadRequests());
  // }, [dispatch]);

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

function BlockedList() {
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

export default Contacts;
