import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  return (
    <section className="w-full px-8 text-gray-700 bg-white">
      <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
          <Link
            href="/"
            className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
          >
            <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
              Richard Yashiro<span className="text-indigo-600">.</span>
            </span>
          </Link>
        </div>

        {session?.user ? (
          <div className="flex items-center gap-4">
            <span>{session.user.name}</span>
            <Link
              href="/events/create"
              className="h-10 px-6 font-semibold rounded-md bg-green-700 text-white"
            >
              Создать событие
            </Link>
            <button
              className="h-10 px-6 font-semibold rounded-md bg-red-700 text-white"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <Link
              href="/api/auth/signin"
              className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
