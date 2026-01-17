'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Trip } from '@/types';
import NearbyPlaces from '@/components/NearbyPlaces';
import ConfirmModal from '@/components/ConfirmModal';
import { Plus, MapPin, LogOut, Globe, Search, Star, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    tripId: string | null;
    tripTitle: string;
  }>({
    isOpen: false,
    tripId: null,
    tripTitle: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTrips(trips);
    } else {
      const filtered = trips.filter(
        (trip) =>
          trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredTrips(filtered);
    }
  }, [searchQuery, trips]);

  const fetchTrips = async () => {
    try {
      const { data } = await api.get('/trip');
      setTrips(data);
      setFilteredTrips(data);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      toast.error('Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: string, title: string) => {
    setDeleteModal({ isOpen: true, tripId: id, tripTitle: title });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, tripId: null, tripTitle: '' });
  };

  const handleDelete = async () => {
    if (!deleteModal.tripId) return;

    try {
      await api.delete(`/trip/${deleteModal.tripId}`);
      setTrips(trips.filter((trip) => trip._id !== deleteModal.tripId));
      toast.success('Trip deleted successfully');
    } catch (error) {
      console.error('Failed to delete trip:', error);
      toast.error('Failed to delete trip');
    }
  };

  // Group trips by month
  const groupTripsByMonth = (trips: Trip[]) => {
    const grouped: { [key: string]: Trip[] } = {};

    trips.forEach((trip) => {
      const monthKey = format(new Date(trip.startDate), 'MMMM yyyy');
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(trip);
    });

    return grouped;
  };

  const renderStars = (rating?: number) => {
    const stars = [];
    const ratingValue = rating || 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        stars.push(
          <Star
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 fill-primary-400 text-primary-400"
          />,
        );
      } else if (i - 0.5 === ratingValue) {
        stars.push(
          <Star
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 fill-primary-400/50 text-primary-400"
          />,
        );
      } else {
        stars.push(
          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />,
        );
      }
    }

    return stars;
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const groupedTrips = groupTripsByMonth(filteredTrips);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              My Travel Journal
            </h1>
            <Link
              href="/dashboard/trips/new"
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-full hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-900/20"
            >
              <Plus className="w-5 h-5" />
              <span>Add Trip</span>
            </Link>
          </div>

          {/* Search Bar */}
          {trips.length > 0 && (
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:bg-white/10"
              />
            </div>
          )}
        </div>

        {/* Nearby Places */}
        <div className="mb-12">
          <NearbyPlaces />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="mt-4 text-slate-400">Loading your trips...</p>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              {searchQuery ? 'No trips found' : 'No trips yet'}
            </h3>
            <p className="text-slate-400 mb-8">
              {searchQuery
                ? 'Try a different search term'
                : 'Start documenting your travel adventures!'}
            </p>
            {!searchQuery && (
              <Link
                href="/dashboard/trips/new"
                className="inline-flex items-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-full hover:bg-cyan-500 transition shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Trip Here</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedTrips).map(([month, monthTrips]) => (
              <div key={month}>
                {/* Month Header */}
                <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                  {month}
                </h2>

                {/* Trips List */}
                <div className="space-y-4">
                  {monthTrips.map((trip) => (
                    <motion.div 
                        key={trip._id} 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                      {/* Delete Button (Mobile - Top Right) */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          openDeleteModal(trip._id, trip.title);
                        }}
                        className="sm:hidden absolute top-2 right-2 z-20 bg-black/60 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-500 transition shadow-lg"
                      >
                       <LogOut className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/dashboard/trips/${trip._id}`}
                        className="block"
                      >
                        <GlassCard className="p-0 hover:border-cyan-500/30 transition-all duration-300 group-hover:bg-white/10" hoverEffect={false}>
                          <div className="flex flex-col sm:flex-row h-full sm:h-40">
                            {/* Poster Image */}
                            <div className="w-full sm:w-48 h-48 sm:h-full flex-shrink-0 relative overflow-hidden">
                              {trip.coverImage ||
                              (trip.images && trip.images.length > 0) ? (
                                <img
                                  src={
                                    trip.coverImage || trip.images?.[0] || ''
                                  }
                                  alt={trip.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                                  <MapPin className="w-8 h-8 text-slate-600" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/60" />
                              
                              {/* Date Overlay (Mobile) */}
                               <div className="absolute bottom-3 left-3 sm:hidden text-white font-bold drop-shadow-md">
                                  {format(new Date(trip.startDate), 'MMM d, yyyy')}
                               </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-5 flex flex-col justify-between relative">
                              <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                    {trip.title}
                                    </h3>
                                    <div className="flex items-center text-slate-400 text-sm mb-3">
                                    <MapPin className="w-4 h-4 mr-1 text-cyan-500" />
                                    <span>
                                        {trip.destination}
                                    </span>
                                    <span className="mx-2 text-slate-600">•</span>
                                    {/* Date (Desktop) */}
                                    <span className="hidden sm:inline text-slate-500">{format(new Date(trip.startDate), 'MMMM d, yyyy')}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm line-clamp-2 sm:line-clamp-2 max-w-xl">
                                        {trip.description}
                                    </p>
                                </div>

                                 {/* Delete Button (Desktop) */}
                                 <div className="hidden sm:flex items-center pt-1 pr-1">
                                    <button
                                        onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation(); // Stop link navigation
                                        openDeleteModal(trip._id, trip.title);
                                        }}
                                        className="text-slate-500 hover:text-red-400 p-2 hover:bg-white/5 rounded-full transition"
                                        title="Delete Trip"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                              </div>

                              {/* Rating & Footer */}
                              <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                                <div className="flex items-center space-x-1">
                                  {renderStars(trip.rating)}
                                </div>
                                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                                    View Details
                                </div>
                              </div>
                            </div>
                          </div>
                        </GlassCard>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Delete Trip"
        message={`Are you sure you want to delete "${deleteModal.tripTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
