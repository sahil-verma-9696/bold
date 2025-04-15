import { UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import css from "./../styles/style.module.css";

export function Header() {
  return (
    <header className="z-50 fixed top-0 w-full p-4 dark:text-white border-b border-white/10 rounded-br-lg rounded-bl-lg flex items-center justify-between bg-white/10 backdrop-blur-md shadow-lg">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold ">Bold</h1>
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

      <Link className={css.cta} to="/auth">
        <UserRoundPlus />
        Signup
      </Link>
    </header>
  );
}
