'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Globe, LogOut, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href={user ? '/' : '/'}
            className="flex items-center space-x-2 group relative z-50"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-50 group-hover:opacity-100 transition duration-500" />
              <Globe className="relative w-8 h-8 text-cyan-400 group-hover:rotate-180 transition duration-700 ease-in-out" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              TravelLog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-slate-300 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-slate-300 hover:text-red-400 transition-colors group"
                >
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
                </Link>
                <Link
                  href="/register"
                  className="group relative px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-sm font-semibold text-white">
                    Sign Up
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative z-50">
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 pt-24 pb-10 px-6 shadow-2xl md:hidden flex flex-col items-center space-y-8"
          >
            {user ? (
              <>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 mb-2">
                    <User className="w-8 h-8 text-cyan-400" />
                  </div>
                  <span className="text-lg font-medium text-cyan-100">
                    {user.name || user.email}
                  </span>
                </div>

                <div className="w-full h-px bg-white/10" />

                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-white font-medium hover:text-cyan-400 transition-colors"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="text-xl">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full max-w-xs text-center py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-lg font-bold shadow-lg shadow-cyan-900/20"
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
