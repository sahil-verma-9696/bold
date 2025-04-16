import { UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="z-50 fixed top-0 w-full p-4 border-b border-white/10 rounded-br-lg rounded-bl-lg flex items-center justify-between bg-white/10 backdrop-blur-md shadow-lg text-gray-900 dark:text-white">
      <Link to="/">
        <h1 className="text-2xl font-bold">Bold</h1>
      </Link>

      <nav className="flex gap-4">
        <Link to="/" className="text-lg hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-lg hover:underline">
          About
        </Link>
        <Link to="/contact" className="text-lg hover:underline">
          Contact Us
        </Link>
      </nav>

      <Link
        to="/auth"
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition duration-300"
      >
        <UserRoundPlus size={20} />
        <span className="hidden sm:inline">Signup</span>
      </Link>
    </header>
  );
}
