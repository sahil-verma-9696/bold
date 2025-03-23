import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-balck shadow-xl rounded-lg overflow-hidden">
        {/* Header Section */}
        <div
          className="relative h-48 bg-cover bg-center"
          style={{ backgroundImage: "url('/contact-bg.jpg')" }}
        >
          <div className="bg-black/50 absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white">Contact Us</h2>
          </div>
        </div>

        {/* Contact Details */}
        <div className="p-8 space-y-6 text-gray-700">
          <p className="text-center text-lg">
            Have any questions? Feel free to reach out to us.
          </p>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <Link
                to="mailto:sahils.verma.1000@gmail.com"
                className="text-blue-600 hover:underline"
              >
                sahils.verma.1000@gmail.com
              </Link>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <Link
                to="tel:+911234567890"
                className="text-blue-600 hover:underline"
              >
                +91 1234567890
              </Link>
            </div>

            {/* Address */}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600">
                Kanpur, Uttar Pradesh, India
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
