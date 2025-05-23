export function SidebarItem({ item }) {
  return (
    <li
      onClick={item.onClick}
      className={`w-full flex flex-col items-center text-gray-800 dark:text-white dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer ${
        item.isActive ? "bg-gray-800" : ""
      }`}
    >
      {item.icon}
      <span className="text-sm">{item.label}</span>
    </li>
  );
}
