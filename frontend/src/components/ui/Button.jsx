import { Pencil } from "lucide-react";

export function ButtonEditProfile(props) {
  return (
    <button
      {...props}
      className="bg-[#1E1F22] text-white w-full cursor-pointer px-4 py-2 rounded-lg hover:text-gray-100 flex gap-4 items-center"
      title="Edit Profile"
    >
      <Pencil size={20} /> Edit Profile
    </button>
  );
}
