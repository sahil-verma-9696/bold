import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-[94vh] bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center p-8 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Hello there!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Welcome to Bold
        </p>
        <Link
          to="/auth"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-medium shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
