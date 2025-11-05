'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Trip } from '@/types';
import ImageUpload from '@/components/ImageUpload';
import ConfirmModal from '@/components/ConfirmModal';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Edit,
  Globe,
  Image as ImageIcon,
  X,
  Star,
} from 'lucide-react';
import { format } from 'date-fns';

export default function TripDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deleteImageModal, setDeleteImageModal] = useState<{
    isOpen: boolean;
    imageIndex: number | null;
  }>({
    isOpen: false,
    imageIndex: null,
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
      setTrip(data);
    } catch (error) {
      console.error('Failed to fetch trip:', error);
      toast.error('Failed to load trip');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const { data } = await api.post(`/trip/${params.id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTrip(data.trip);
      setShowUpload(false);
    } catch (error) {
      console.error('Failed to upload images:', error);
      throw error;
    }
  };

  const openDeleteImageModal = (imageIndex: number) => {
    setDeleteImageModal({ isOpen: true, imageIndex });
  };

  const closeDeleteImageModal = () => {
    setDeleteImageModal({ isOpen: false, imageIndex: null });
  };

  const handleDeleteImage = async () => {
    if (deleteImageModal.imageIndex === null) return;

    try {
      const { data } = await api.delete(
        `/trip/${params.id}/images/${deleteImageModal.imageIndex}`,
      );
      setTrip(data.trip);
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Failed to delete image:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleSetCover = async (imageIndex: number) => {
    try {
      const { data } = await api.put(`/trip/${params.id}/cover`, {
        imageIndex,
      });
      setTrip(data.trip);
      toast.success('Cover image updated!');
    } catch (error) {
      console.error('Failed to set cover image:', error);
      toast.error('Failed to set cover image');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-300 hover:text-primary-400 mb-4 sm:mb-6 text-sm sm:text-base transition"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="glass-dark rounded-2xl shadow-xl overflow-hidden border border-white/10">
          {/* Hero Image */}
          <div className="h-48 sm:h-64 bg-gradient-to-br from-primary-600 to-cyan-600 flex items-center justify-center relative overflow-hidden">
            {trip.coverImage || (trip.images && trip.images.length > 0) ? (
              <img
                src={trip.coverImage || trip.images?.[0] || ''}
                alt={trip.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() =>
                  setSelectedImage(trip.coverImage || trip.images?.[0] || '')
                }
              />
            ) : (
              <MapPin className="w-16 h-16 sm:w-24 sm:h-24 text-white/50" />
            )}
          </div>

          <div className="p-4 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  {trip.title}
                </h1>
                <div className="flex items-center text-gray-400 mb-2 text-sm sm:text-base">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span>{trip.destination}</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm sm:text-base">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span>
                    {format(new Date(trip.startDate), 'MMMM d, yyyy')} -{' '}
                    {format(new Date(trip.endDate), 'MMMM d, yyyy')}
                  </span>
                </div>
              </div>
              <Link
                href={`/dashboard/trips/${trip._id}/edit`}
                className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm sm:text-base"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Link>
            </div>

            {/* Description */}
            <div className="border-t border-white/10 pt-6 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                About This Trip
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
                {trip.description}
              </p>
            </div>

            {/* Photos Section */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Photos
                </h2>
                <button
                  onClick={() => setShowUpload(!showUpload)}
                  className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-semibold text-sm sm:text-base transition"
                >
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{showUpload ? 'Cancel' : 'Add Photos'}</span>
                </button>
              </div>

              {/* Upload Component */}
              {showUpload && (
                <div className="mb-6">
                  <ImageUpload onUpload={handleImageUpload} />
                </div>
              )}

              {/* Image Gallery */}
              {trip.images && trip.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {trip.images.map((image, index) => (
                    <div key={index} className="relative group">
                      {/* Cover Image Badge */}
                      {trip.coverImage === image && (
                        <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full z-10 flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Cover</span>
                        </div>
                      )}

                      <img
                        src={image}
                        alt={`${trip.title} - Photo ${index + 1}`}
                        className="w-full h-32 sm:h-48 object-cover rounded-lg border border-white/20 cursor-pointer hover:opacity-80 transition"
                        onClick={() => setSelectedImage(image)}
                      />

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition">
                        {trip.coverImage !== image && (
                          <button
                            onClick={() => handleSetCover(index)}
                            className="bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700 transition"
                            title="Set as cover"
                          >
                            <Star className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => openDeleteImageModal(index)}
                          className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
                          title="Delete image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !showUpload && (
                  <div className="glass rounded-lg p-6 sm:p-8 text-center border border-white/10">
                    <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-sm sm:text-base text-gray-400 mb-4">
                      No photos yet. Add some memories!
                    </p>
                    <button
                      onClick={() => setShowUpload(true)}
                      className="text-primary-400 hover:text-primary-300 font-semibold text-sm sm:text-base transition"
                    >
                      Upload Photos
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Delete Image Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteImageModal.isOpen}
        onClose={closeDeleteImageModal}
        onConfirm={handleDeleteImage}
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
