import { useDispatch, useSelector } from "react-redux";
import { setActiveHeader } from "../../redux/slices/contactSlice";

export function Header() {
  const headers = ["pending", "friends", "blocked", "requests"];
  const activeHeader = useSelector((store) => store.contacts.activeHeader);
  const pendings = useSelector((store) => store.user.pendings);
  const requests = useSelector((store) => store.user.requests);
  const friends = useSelector((store) => store.user.friends);
  const dispatch = useDispatch();

  // Get counts safely
  const pendingCount = pendings?.length || 0;
  const requestCount = requests?.length || 0;
  const friendCount = friends?.length || 0;

  return (
    <div className="flex gap-6 border-b border-gray-700 pb-2">
      {headers.map((header) => {
        let count = 0;

        if (header === "pending") count = pendingCount;
        if (header === "requests") count = requestCount;

        return (
          <button
            key={header}
            className={`relative pb-1 text-lg font-semibold cursor-pointer ${
              activeHeader === header
                ? "border-b-2 border-white text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => dispatch(setActiveHeader(header))}
          >
            {header}
            {header == "friends" && <span> ({friendCount})</span>}
            {/* Show badge if there is any count */}
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
