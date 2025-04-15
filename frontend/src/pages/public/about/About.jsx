import { Link } from "react-router-dom";
import { MessageSquare, ShieldCheck, Users, Rocket } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-cover bg-center text-white bg-[url('/hero-bg.jpg')]">
        <div className="bg-black/50 absolute inset-0"></div>
        <div className="relative text-center px-6">
          <h1 className="text-4xl font-bold">About Bold Chat</h1>
          <p className="mt-2 text-lg max-w-xl mx-auto">
            The fastest, most secure, and user-friendly chat platform for modern
            teams and businesses.
          </p>
        </div>
      </section>

      {/* Why Choose Bold Chat */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center">
          Why Choose Bold Chat?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          Designed to streamline communication and enhance team productivity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <FeatureCard
            icon={MessageSquare}
            title="Real-Time Messaging"
            description="Lightning-fast communication with zero delays."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Secure & Private"
            description="End-to-end encryption for maximum security."
          />
          <FeatureCard
            icon={Users}
            title="Team Collaboration"
            description="Organized group chats for seamless teamwork."
          />
          <FeatureCard
            icon={Rocket}
            title="Lightning Performance"
            description="Optimized for speed, efficiency, and reliability."
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-400">
            Meet the Team
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
            A team of passionate developers, designers, and innovators.
          </p>

          <div className="flex justify-center mt-10">
            <TeamMember
              name="Sahil Verma"
              role="CEO, Founder, Designer & Developer"
              imgSrc="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-bold">Start Chatting Today!</h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Join thousands of teams using Bold Chat for seamless collaboration.
        </p>

        <Link
          to="/auth"
          className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md flex items-center space-x-4 transition">
      <Icon className="text-blue-600 dark:text-blue-400 w-10 h-10" />
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}

// Team Member Component
function TeamMember({ name, role, imgSrc }) {
  return (
    <div className="text-center">
      <img
        src={imgSrc}
        alt={name}
        className="w-32 h-32 mx-auto rounded-full shadow-lg object-cover"
      />
      <h3 className="text-lg font-semibold mt-4">{name}</h3>
      <p className="text-gray-500 dark:text-gray-300">{role}</p>
    </div>
  );
}
