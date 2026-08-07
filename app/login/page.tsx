import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/social-bg.png')",
      }}
    >
      <div className="rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
          Continue with
        </h2>

        <div className="flex items-center justify-center gap-4">
          {/* Google */}
          <button
            type="button"
            className="flex h-11 w-20 items-center justify-center rounded-md border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-md"
          >
            <FaGoogle className="text-lg text-[#EA4335]" />
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="flex h-11 w-20 items-center justify-center rounded-md border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-md"
          >
            <FaFacebookF className="text-lg text-[#1877F2]" />
          </button>

          {/* Apple */}
          <button
            type="button"
            className="flex h-11 w-20 items-center justify-center rounded-md border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-md"
          >
            <FaApple className="text-xl text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}