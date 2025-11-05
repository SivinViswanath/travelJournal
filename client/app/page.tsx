import Link from 'next/link';
import { MapPin, Camera, Globe, Compass, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-dark sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" />
              <span className="text-xl sm:text-2xl font-bold text-white">
                TravelLog
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href="/login"
                className="text-sm sm:text-base text-gray-300 hover:text-primary-400 font-medium px-2 sm:px-0 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-primary-600 text-white px-3 sm:px-6 py-2 rounded-lg hover:bg-primary-700 transition text-sm sm:text-base"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
            Your Travel Stories,
            <br className="hidden sm:block" />
            <span className="text-primary-400"> Beautifully Preserved</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Document your adventures, save memories with photos, rate your
            trips, and discover amazing places around the world.
          </p>
          <Link
            href="/register"
            className="inline-block bg-primary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-primary-700 transition shadow-lg"
          >
            Start Your Journey
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-20">
          <div className="glass-dark p-6 sm:p-8 rounded-xl border border-white/10 hover:border-primary-400/50 transition">
            <div className="bg-primary-600/20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-primary-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              Track Your Travels
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Keep a detailed journal of all the places you've visited with
              dates and descriptions.
            </p>
          </div>

          <div className="glass-dark p-6 sm:p-8 rounded-xl border border-white/10 hover:border-primary-400/50 transition">
            <div className="bg-primary-600/20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4">
              <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-primary-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              Capture Memories
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Add photos to your travel entries and relive your favorite moments
              anytime.
            </p>
          </div>

          <div className="glass-dark p-6 sm:p-8 rounded-xl border border-white/10 hover:border-primary-400/50 transition">
            <div className="bg-primary-600/20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4">
              <Star className="w-7 h-7 sm:w-8 sm:h-8 text-primary-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              Rate Your Trips
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Give each trip a star rating and see your favorites at a glance.
            </p>
          </div>

          <div className="glass-dark p-6 sm:p-8 rounded-xl border border-white/10 hover:border-primary-400/50 transition sm:col-span-2 lg:col-span-1">
            <div className="bg-primary-600/20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4">
              <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-primary-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              Discover Places
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Find nearby tourist attractions based on your current location.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-24 text-center glass-dark rounded-2xl border border-white/10 p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join travelers documenting their journeys. Create your free account
            today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto glass border border-white/20 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
