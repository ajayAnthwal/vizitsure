import Image from "next/image";
import { FiUser, FiSettings } from "react-icons/fi"; // Importing icons from React Icons

export default function Header() {
  return (
    <header className="bg-gray-100 py-4 border-b border-gray-300 ">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.webp"
            alt="VizitSure Logo"
            width={200}
            height={32}
            className="h-8 object-contain"
          />
        </div>

        {/* Center Content */}
        <div className="flex items-center flex-col text-center">
          <Image
            src="/logo.webp"
            alt="Center Logo"
            width={100}
            height={100}
            className="h-8 object-contain"
          />
          <p className="text-sm text-gray-600">Haridwar, UK, India</p>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button>
            <FiUser className="h-6 w-6 text-gray-600 hover:text-black transition duration-200" />
          </button>

          <button>
            <FiSettings className="h-6 w-6 text-gray-600 hover:text-black transition duration-200" />
          </button>
        </div>
      </div>
    </header>
  );
}
