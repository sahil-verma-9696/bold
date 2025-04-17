import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../features/user/userSlice";
import { Check, Cross, X } from "lucide-react";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const users = useSelector((store) => store.user.users);
  return (
    <div className="py-4">
      <section className="bg-gray-700 px-2 py-1">
        <h1>All users</h1>
      </section>
      <ul className="">
        {users?.map((user) => {
          return (
            <li
              key={user?.name}
              className="flex justify-between items-center hover:bg-gray-700 p-2 rounded-md cursor-pointer active:scale-98 select-none"
            >
              <div className="flex gap-2">
                <img
                  src="https://res.cloudinary.com/dfqdx3ieb/image/upload/v1742281653/default_user.png"
                  className="size-12 rounded-full border-2 border-white inline"
                />
                <div className="flex flex-col">
                  <span className="text-lg capitalize">{user.name}</span>
                  <span className="text-sm opacity-45">{user.email}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span>
                  <Check />
                </span>
                <span>
                  <X />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
