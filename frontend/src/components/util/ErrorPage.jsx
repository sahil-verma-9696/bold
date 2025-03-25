import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg">The page you requested could not be found.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Go Home
      </Link>
    </div>
  );
}
