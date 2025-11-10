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
      {/* Navigation */}
      <nav className="glass-dark sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" />
              <span className="text-xl sm:text-2xl font-bold text-white">
                TravelLog
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-sm sm:text-base text-gray-300 hidden sm:inline truncate max-w-[150px]">
                {user.name || user.email}
              </span>
              <button
                onClick={logout}
                className="flex items-center space-x-1 sm:space-x-2 text-gray-300 hover:text-red-400 transition text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              My Travel Journal
            </h1>
            <Link
              href="/dashboard/trips/new"
              className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary-700 transition shadow-lg text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add Trip</span>
            </Link>
          </div>

          {/* Search Bar */}
          {trips.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base text-white placeholder-gray-400"
              />
            </div>
          )}
        </div>

        {/* Nearby Places */}
        <div className="mb-8">
          <NearbyPlaces />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading your trips...</p>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              {searchQuery ? 'No trips found' : 'No trips yet'}
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6">
              {searchQuery
                ? 'Try a different search term'
                : 'Start documenting your travel adventures!'}
            </p>
            {!searchQuery && (
              <Link
                href="/dashboard/trips/new"
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Trip Here</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedTrips).map(([month, monthTrips]) => (
              <div key={month}>
                {/* Month Header */}
                <h2 className="text-lg sm:text-xl font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                  {month}
                </h2>

                {/* Trips List */}
                <div className="space-y-3">
                  {monthTrips.map((trip) => (
                    <div key={trip._id} className="relative">
                      {/* Delete Button (Mobile - Top Right) */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          openDeleteModal(trip._id, trip.title);
                        }}
                        className="sm:hidden absolute top-2 right-2 z-10 bg-black/70 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-red-500 hover:scale-110 transition"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>

                      <Link
                        href={`/dashboard/trips/${trip._id}`}
                        className="block"
                      >
                        <div className="glass-dark rounded-lg border border-white/10 hover:border-primary-400/50 transition overflow-hidden">
                          <div className="flex">
                            {/* Date Box */}
                            <div className="w-16 sm:w-20 flex-shrink-0 bg-white/5 border-r border-white/10 flex flex-col items-center justify-center p-2">
                              <div className="text-2xl sm:text-3xl font-bold text-white">
                                {format(new Date(trip.startDate), 'd')}
                              </div>
                              <div className="text-xs text-gray-400 uppercase">
                                {format(new Date(trip.startDate), 'MMM')}
                              </div>
                            </div>

                            {/* Poster Image */}
                            <div className="w-16 h-24 sm:w-20 sm:h-28 flex-shrink-0 bg-gradient-to-br from-primary-600 to-cyan-600 relative">
                              {trip.coverImage ||
                              (trip.images && trip.images.length > 0) ? (
                                <img
                                  src={
                                    trip.coverImage || trip.images?.[0] || ''
                                  }
                                  alt={trip.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <MapPin className="w-6 h-6 text-white/50" />
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0">
                              <div>
                                <h3 className="text-base sm:text-lg font-bold text-white mb-1 truncate pr-8 sm:pr-0">
                                  {trip.title}
                                </h3>
                                <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-2">
                                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">
                                    {trip.destination}
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span className="text-gray-500">
                                    {format(new Date(trip.startDate), 'yyyy')}
                                  </span>
                                </div>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center space-x-1">
                                {renderStars(trip.rating)}
                                {trip.rating && trip.rating > 0 && (
                                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-red-500 text-red-500 ml-2" />
                                )}
                              </div>
                            </div>

                            {/* Delete Button (Desktop) */}
                            <div className="hidden sm:flex items-center pr-4">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  openDeleteModal(trip._id, trip.title);
                                }}
                                className="text-gray-500 hover:text-red-400 transition"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
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
