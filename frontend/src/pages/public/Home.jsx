import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="w-[100vw]">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there !</h1>
            <p className="py-6">
              Welcome to Bold
            </p>
            <Link to="/dashboard" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
