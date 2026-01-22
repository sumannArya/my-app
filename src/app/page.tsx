import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-indigo-50 to-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Memeterest
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          The best place to discover, save, and share the funniest memes on the internet.
        </p>

        <div className="flex gap-4">
          {session ? (
            <Link
              href="/create"
              className="rounded-full bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
            >
              Start Posting
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Memeterest. All rights reserved.
      </footer>
    </div>
  );
}
