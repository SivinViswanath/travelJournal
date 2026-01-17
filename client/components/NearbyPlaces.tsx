'use client';

import axios from 'axios';

import { useState } from 'react';
import {
  MapPin,
  Navigation,
  Loader2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Place {
  name: string;
  kinds?: string;
  dist?: number;
  point?: {
    lon: number;
    lat: number;
  };
  xid?: string;
  description?: string;
  rating?: number;
  type?: string;
}

export default function NearbyPlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const getLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          await fetchNearbyPlaces(latitude, longitude);
          setIsExpanded(true);
        },
        (error) => {
          setLoading(false);
          toast.error(
            'Unable to get your location. Please enable location services.',
          );
          console.error('Geolocation error:', error);
        },
      );
    } else {
      setLoading(false);
      toast.error('Geolocation is not supported by your browser');
    }
  };

  const fetchNearbyPlaces = async (lat: number, lng: number) => {
    try {
      // Use our new AI backend instead of OpenTripMap
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/suggestions`,
        {
          latitude: lat,
          longitude: lng,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data && response.data.suggestions) {
        const aiPlaces = response.data.suggestions.map((p: any) => ({
          name: p.name,
          kinds: p.type, // Map AI 'type' to 'kinds' for compatibility
          description: p.description,
          rating: p.rating,
          dist: undefined, // AI doesn't give distance yet
          point: undefined, // AI doesn't give coords yet, will fallback to search
        }));

        setPlaces(aiPlaces);
        toast.success(`AI found ${aiPlaces.length} gems nearby!`);
      } else {
        throw new Error('No suggestions returned');
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      // Fallback only if AI fails completely
      setPlaces([
        { name: 'City Center', kinds: 'tourist_attraction', dist: 500 },
        { name: 'Local Museum', kinds: 'museums', dist: 1200 },
        { name: 'Historic District', kinds: 'historic', dist: 2000 },
      ]);
      toast.error('Could not fetch AI suggestions, showing defaults.');
    } finally {
      setLoading(false);
    }
  };

  const formatDistance = (meters?: number) => {
    if (!meters) return 'Unknown';
    if (meters < 1000) return `${Math.round(meters)}m`;
    return `${(meters / 1000).toFixed(1)}km`;
  };

  const formatKinds = (kinds?: string) => {
    if (!kinds) return 'Attraction';
    // If it's a simple string (AI type), just capitalize it
    if (!kinds.includes('_') && !kinds.includes(',')) {
      return kinds.charAt(0).toUpperCase() + kinds.slice(1);
    }
    const kindsList = kinds.split(',');
    const mainKind = kindsList[0].replace(/_/g, ' ');
    return mainKind.charAt(0).toUpperCase() + mainKind.slice(1);
  };

  return (
    <div className="glass-dark rounded-xl border border-white/10 overflow-hidden">
      {/* Compact Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary-400" />
          <h2 className="text-lg font-bold text-white">Nearby Attractions</h2>
          {places.length > 0 && (
            <span className="text-xs text-gray-400">({places.length})</span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {!loading && !location && (
            <button
              onClick={getLocation}
              className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700 transition text-sm"
            >
              <Navigation className="w-3 h-3" />
              <span className="hidden sm:inline">Find</span>
            </button>
          )}

          {places.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-white transition"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Finding nearby attractions...</span>
          </div>
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && places.length > 0 && (
        <div className="border-t border-white/10">
          {/* Mobile: Horizontal Scroll */}
          <div className="sm:hidden overflow-x-auto">
            <div className="flex gap-2 p-4">
              {places.map((place, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (location && place.point) {
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${place.point.lat},${place.point.lon}`,
                        '_blank',
                      );
                    } else if (location) {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          place.name,
                        )}`,
                        '_blank',
                      );
                    }
                  }}
                  className="flex-shrink-0 w-40 glass rounded-lg p-3 hover:bg-white/10 transition border border-white/10 text-left"
                >
                  <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">
                    {place.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {formatDistance(place.dist)}
                    </span>
                    <ExternalLink className="w-3 h-3 text-primary-400" />
                  </div>
                  <span className="text-xs text-primary-400 mt-1 block">
                    {formatKinds(place.kinds)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: List */}
          <div className="hidden sm:block p-4 space-y-2">
            {places.map((place, index) => (
              <button
                key={index}
                onClick={() => {
                  if (location && place.point) {
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${place.point.lat},${place.point.lon}`,
                      '_blank',
                    );
                  } else if (location) {
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        place.name,
                      )}`,
                      '_blank',
                    );
                  }
                }}
                className="w-full glass rounded-lg p-3 hover:bg-white/10 transition border border-white/10 text-left"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm mb-1">
                      {place.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {formatDistance(place.dist)}
                      </span>
                      <span className="text-primary-400">
                        {formatKinds(place.kinds)}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-primary-400 flex-shrink-0 ml-2" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !location && places.length === 0 && (
        <div className="px-4 pb-4 text-center">
          <p className="text-sm text-gray-400">
            Click "Find" to discover attractions near you
          </p>
        </div>
      )}
    </div>
  );
}
