import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../ui/Avatar";

const RightPannel = () => {
  const receiver = useSelector((store) => store.chat.receiver);
  const currUser = useSelector((store) => store.auth.user);
  const onlineUsers = useSelector((store) => store.user.onlineUsers);

  if (!receiver) return null;
  return (
    <section className="h-screen w-90 dark:bg-black max-lg:hidden">
      <header className="w-full h-50 bg-purple-400 relative">
        <Avatar
          size="md"
          img={receiver.avatar}
          css={"absolute top-full -translate-y-1/2 mx-12"}
          showOnline={onlineUsers.includes(receiver._id)}
        />
      </header>
      <div className="p-12">
        <h2 className="dark:text-white text-2xl">{receiver.name}</h2>
        <h2 className="dark:text-white text-lg">@{receiver.username}</h2>
        <h2 className="dark:text-white text-md">{receiver.email}</h2>
        <h2 className="dark:text-white text-sm italic">{receiver.bio}</h2>

        <div className="py-4">
          {currUser.friends.includes(receiver._id) && (
            <button className="w-full bg-red-400 text-white px-4 py-1 rounded-xl font-bold">
              Remove friend
            </button>
          )}
          {!currUser.friends.includes(receiver._id) &&
            !currUser.pending.includes(receiver._id) && (
              <button className="w-full bg-green-400 text-white px-4 py-1 rounded-xl font-bold">
                Add friend
              </button>
            )}
          {currUser.pending.includes(receiver._id) && (
            <button className="w-full bg-blue-400 text-white px-4 py-1 rounded-xl font-bold">
              Pending ...
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RightPannel;
