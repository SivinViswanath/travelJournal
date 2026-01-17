"use client";

import Link from 'next/link';
import { MapPin, Camera, Globe, Compass, Star, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from "framer-motion";
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [locationName, setLocationName] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleFindNearbyPlaces = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Send coordinates directly to backend (which handles reverse geocoding safely)
          const aiRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai/suggestions`, {
            latitude,
            longitude
          }, {
             withCredentials: true
          });

          if (aiRes.data && aiRes.data.suggestions) {
             setSuggestions(aiRes.data.suggestions);
             if (aiRes.data.location) {
               setLocationName(aiRes.data.location);
               toast.success(`Found gems in ${aiRes.data.location}!`);
             }
             setShowResults(true);
          }

        } catch (error) {
          console.error(error);
          toast.error("Failed to get suggestions");
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error(error);
        toast.error("Unable to retrieve your location");
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen relative text-slate-200 selection:bg-cyan-500/30">
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Next Gen Travel Journal
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Your Journey <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Into the Future
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Document your inter-city or international adventures with a platform designed 
            for the modern explorer. Capture, rate, and relive your memories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register" className="group relative px-8 py-4 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(8,145,178,0.5)] hover:shadow-[0_0_60px_-10px_rgba(8,145,178,0.7)]">
               <span className="flex items-center gap-2 text-lg font-bold text-white">
                  Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </span>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <GlassCard className="p-8 group">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              Track Locations
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Pinpoint every stop on your itinerary with precision mapping and detailed logs.
            </p>
          </GlassCard>

          <GlassCard className="p-8 group">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
              <Camera className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
              Visual Memories
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Store high-resolution snapshots of your favorite moments directly in your journal.
            </p>
          </GlassCard>

          <GlassCard className="p-8 group">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
              Rate Experiences
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Curate your own travel guide by rating places, hotels, and restaurants.
            </p>
          </GlassCard>

          <GlassCard className="p-8 group sm:col-span-2 lg:col-span-3 lg:w-2/3 lg:mx-auto cursor-pointer hover:bg-white/5 transition-all" onClick={handleFindNearbyPlaces}>
             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className={`bg-gradient-to-br from-emerald-500/20 to-teal-500/20 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${isLoading ? 'animate-pulse' : ''}`}>
                  <Compass className={`w-8 h-8 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {isLoading ? "Scanning Surroundings..." : "Find Nearby Hidden Gems"}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {isLoading 
                      ? "Consulting our AI travel agent to find the perfect spots for you..." 
                      : "Tap here to let our AI discover top-rated tourist attractions near your current location."
                    }
                  </p>
                </div>
             </div>
          </GlassCard>
        </motion.div>

        {/* AI Results Section */}
        {showResults && (
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="mt-32"
           >
              <div className="text-center mb-16">
                 <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Top Picks in <span className="text-emerald-400">{locationName}</span>
                 </h2>
                 <p className="text-slate-400">Curated just for you by AI</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {suggestions.map((place, index) => (
                    <GlassCard key={index} className="p-6 flex flex-col h-full border-t-4 border-t-emerald-500/50">
                       <div className="flex justify-between items-start mb-4">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                             {place.type}
                          </span>
                          <div className="flex items-center gap-1 text-yellow-400 font-bold">
                             <Star className="w-4 h-4 fill-current" />
                             {place.rating}
                          </div>
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2">{place.name}</h3>
                       <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                          {place.description}
                       </p>
                       <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/10">
                          View Details
                       </button>
                    </GlassCard>
                 ))}
              </div>
           </motion.div>
        )}

        {/* CTA Section */}
        <div className="mt-32 relative">
           <GlassCard className="p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-cyan-500/10 to-transparent opacity-50 pointer-events-none" />
              
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 relative z-10">
                Ready to <span className="text-cyan-400">Launch?</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto relative z-10">
                Join thousands of digital nomads and travelers documenting their journey through time and space.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
                 <Link
                   href="/register"
                   className="w-full sm:w-auto px-8 py-3 rounded-lg bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors"
                 >
                   Get Started Free
                 </Link>
                 <Link
                   href="/login"
                   className="w-full sm:w-auto px-8 py-3 rounded-lg border border-white/20 hover:bg-white/5 text-white font-medium transition-colors"
                 >
                   Sign In
                 </Link>
              </div>
           </GlassCard>
        </div>
      </main>
    </div>
  );
}
