'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { ArrowLeft, Globe, Star } from 'lucide-react';

export default function EditTripPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    description: '',
    startDate: '',
    endDate: '',
    rating: 0,
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (params.id) {
      fetchTrip();
    }
  }, [user, params.id]);

  const fetchTrip = async () => {
    try {
      const { data } = await api.get(`/trip/${params.id}`);
      setFormData({
        title: data.title,
        destination: data.destination,
        description: data.description,
        startDate: data.startDate.split('T')[0],
        endDate: data.endDate.split('T')[0],
        rating: data.rating || 0,
      });
    } catch (error) {
      console.error('Failed to fetch trip:', error);
      toast.error('Failed to load trip');
      router.push('/dashboard');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/trip/${params.id}`, formData);
      toast.success('Trip updated successfully!');
      router.push(`/dashboard/trips/${params.id}`);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Failed to update trip';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-dark sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" />
            <span className="text-xl sm:text-2xl font-bold text-white">
              TravelLog
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Link
          href={`/dashboard/trips/${params.id}`}
          className="inline-flex items-center text-gray-300 hover:text-primary-400 mb-4 sm:mb-6 text-sm sm:text-base transition"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back to Trip
        </Link>

        <div className="glass-dark rounded-2xl p-4 sm:p-8 border border-white/10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Edit Trip
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Trip Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Destination *
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-3 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base text-white"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate}
                  className="w-full px-4 py-3 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base resize-none text-white"
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rate Your Trip
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="transition hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'fill-primary-400 text-primary-400'
                          : 'text-gray-600 hover:text-gray-500'
                      }`}
                    />
                  </button>
                ))}
                {formData.rating > 0 && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: 0 })}
                    className="text-xs text-gray-400 hover:text-white ml-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 text-sm sm:text-base"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <Link
                href={`/dashboard/trips/${params.id}`}
                className="px-6 py-3 glass border border-white/20 text-gray-300 rounded-lg hover:bg-white/10 transition text-center text-sm sm:text-base"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
