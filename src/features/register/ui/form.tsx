import Link from "next/link";

export const RegistrationForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] px-6 py-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md space-y-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Create account<span className="text-indigo-500">.</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Join us to start creating your events
          </p>
        </div>

        <form action="#" method="POST" className="mt-8 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 ml-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              className="block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 ml-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 ml-1"
            >
              Repeat Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="relative group w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0b] focus:ring-indigo-600 transition-all duration-300 active:scale-[0.98]"
            >
              Sign Up
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/api/auth/signin"
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
