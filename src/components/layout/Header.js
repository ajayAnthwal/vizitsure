import Image from "next/image";
import { FiUser, FiSettings } from "react-icons/fi";
import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-gray-100 py-4 border-b border-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 space-y-4 md:space-y-0">
        <div className="flex items-center hidden md:block">
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="VizitSure Logo"
              width={200}
              height={32}
              className="h-8 object-contain"
            />
          </Link>
        </div>

        <div className="text-center">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="Center Logo"
            width={100}
            height={100}
            className="mx-auto h-12 w-auto md:h-8 object-contain"
          />
          </Link>
          <p className="text-sm text-gray-600 mt-2 md:mt-0">
            Haridwar, UK, India
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4">
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
