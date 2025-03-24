import { UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";

function PublicHeader() {
  return (
    <header className="z-50 fixed top-0 w-full p-4 dark:text-white border-b border-white/10 rounded-br-lg rounded-bl-lg flex items-center justify-between bg-white/10 backdrop-blur-md shadow-lg">
      {/* Left Side Navigation */}
      <Link to={"/"}>
        <h1 className="text-2xl font-bold ">Bold</h1>
      </Link>

      {/* Center Title */}
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

      {/* Right Side Get Started Button */}
      <Link
        to="/signup"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex gap-2"
      >
        <UserRoundPlus />
        Signup
      </Link>
    </header>
  );
}

export default PublicHeader;
