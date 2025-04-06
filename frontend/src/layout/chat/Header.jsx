import { Search } from "lucide-react";
import React from "react";
import { formatMongoTime } from "../../utils/utility";
import { useSelector } from "react-redux";

function Header({ sender }) {
  const headerConfig = {};
  return (
    <header className="bg-gray-900 py-2 px-6 flex justify-between items-center">
      <UserPlaceholder sender={sender} />
      <div className="py-2 px-3 hover:bg-base-200 rounded-lg">
        <Search />
      </div>
    </header>
  );
}

function UserPlaceholder({ sender }) {
  const [lastSeenObj] = useSelector((store) => store.chat.lastSeen);
  console.log(lastSeenObj?.lastSeen)
  return (
    <div className="flex gap-4">
      <div className="logo-wrapper size-12 rounded-full overflow-hidden">
        <img className="size-full object-cover " src={sender?.avatar} alt="" />
      </div>
      <div>
        <h2 className="font-bold text-lg">{sender?.name}</h2>
        <p className="font-thin textarea-sm">
          last seen:
          <time>
            {!lastSeenObj ? (
              <span className="text-green-300 font-bold">online</span>
            ) : (
              formatMongoTime(lastSeenObj?.lastSeen)
            )}
          </time>
        </p>
      </div>
    </div>
  );
}

export default Header;
