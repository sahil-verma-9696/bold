import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  return (
    <main className="w-[100vw] h-[100vh] dark:bg-black flex dark:text-white">
      <section className="h-full w-[35%] flex flex-row-reverse justify-between p-4">
        <ul>
          <li className="dark:text-white list-none">User Settings</li>
        </ul>
        <div>
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => navigate("/lobby")}
            color="white"
          />
        </div>
      </section>

      <section className="h-full dark:bg-[#131416] flex-1 p-4 pt-12">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Profile</h1>
          <button className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
            Save Changes
          </button>
        </div>

        <div className="flex mx-4">
          <form className="mt-10 w-[70%]" action="">
            <div className="border w-full relative rounded-lg">
              <label
                className="absolute top-[-10px] left-4 px-2 bg-white dark:bg-[#131416] text-sm"
                htmlFor="Display Name"
              >
                Display Name
              </label>
              <input
                className="py-2 pt-3 px-4 outline-none"
                type="text"
                placeholder="Name"
              />
            </div>

            <div className="border w-full relative rounded-lg mt-4">
              <label
                className="absolute top-[-10px] left-4 px-2 bg-white dark:bg-[#131416] text-sm"
                htmlFor="Display Name"
              >
                Display Name
              </label>
              <textarea
                className="py-2 pt-3 px-4 outline-none resize-none h-40 w-full"
                placeholder="Name"
              />
            </div>
          </form>

          <section className="w-full ">
            <div className="w-fit m-auto">
              <h2 className="text-2xl">Preview</h2>

              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-[#131416] dark:text-white overflow-hidden rounded-lg w-70 shadow-[0px_0px_9px_black] m-auto mt-4"
              >
                <div className="relative bg-purple-400 w-full h-30">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Avatar"
                    className="absolute top-full -translate-y-1/2 mx-10 rounded-full border-4 border-white"
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>

                <div className="p-10">
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-sm">@johndoe</p>
                  <p className="text-sm">john.doe@example.com</p>
                  <p className="italic text-sm text-gray-600">
                    Passionate developer and coffee lover.
                  </p>
                  <p className="py-2 text-gray-500 mb-4">
                    Joined on 01/01/2024
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

function Loading() {
  return (
    <main className="w-[100vw] h-[100vh] dark:bg-black flex">
      <section className="h-full w-[35%] animate-pulse"></section>
      <section className="h-full dark:bg-[#131416] flex-1 animate-pulse"></section>
    </main>
  );
}
export default Setting;
