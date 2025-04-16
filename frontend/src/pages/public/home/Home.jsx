import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white bg-opacity-90 rounded-xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Hello there!
        </h1>
        <p className="text-lg text-gray-600 mb-6">Welcome to Bold</p>
        <Link
          to="/auth"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-medium shadow-md hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
