import Link from "next/link";
import { Car, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
      <div className="relative z-10 text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30">
          <Car className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-7xl font-extrabold text-gradient-blue mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Took a Wrong Turn?</h2>
        <p className="text-white/50 mb-8">
          The page you&apos;re looking for has driven off. Let&apos;s get you back on the road.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
            <Home className="w-4 h-4" />
            Back Home
          </Link>
          <Link href="/cars" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 glass border border-white/[0.1] text-white font-medium rounded-xl hover:border-white/25 transition-all">
            <Search className="w-4 h-4" />
            Browse Cars
          </Link>
        </div>
      </div>
    </div>
  );
}
