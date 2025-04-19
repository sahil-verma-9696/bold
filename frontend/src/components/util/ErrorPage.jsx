import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  console.table(error);

  // Determine error message and status
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const message = isRouteErrorResponse(error)
    ? error.statusText || "Something went wrong"
    : error?.message || "Unknown error occurred";

  if (!error) return;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-xl mb-2">An unexpected error has occurred.</p>

      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-xl">
        <p className="font-semibold">Error {status}:</p>
        <pre className="whitespace-pre-wrap break-words mt-2">{message}</pre>
      </div>

      <Link
        to="/"
        className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        ⬅ Go Back Home
      </Link>
    </div>
  );
}
