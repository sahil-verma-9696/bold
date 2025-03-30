import { Search } from "lucide-react";
import React from "react";

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

function UserPlaceholder({sender}) {
  return (
    <div className="flex gap-4">
      <div className="logo-wrapper size-12 rounded-full overflow-hidden">
        <img className="size-full object-cover " src={sender?.avatar} alt="" />
      </div>
      <div>
        <h2 className="font-bold text-lg">Sahil Verma</h2>
        <p className="font-thin textarea-sm">
          last seen:<time> 2 hours ago</time>
        </p>
      </div>
    </div>
  );
}

export default Header;
