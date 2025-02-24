import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserListings } from '../lib/firebase';
import { Package, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrls: string[];
  status: string;
  createdAt: string;
}

export default function UserProfile() {
  const { currentUser, logout } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [activeTab, setActiveTab] = useState('listings');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserListings = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          const fetchedListings = await getUserListings(currentUser.uid);
          setListings(fetchedListings);
        } catch (error) {
          console.error('Error fetching user listings:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserListings();
  }, [currentUser]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                {currentUser?.email?.[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentUser?.email?.split('@')[0]}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <nav className="flex divide-x divide-gray-200 dark:divide-gray-700">
              <button
                onClick={() => setActiveTab('listings')}
                className={`flex-1 px-6 py-4 text-sm font-medium ${
                  activeTab === 'listings'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Package className="w-5 h-5 inline-block mr-2" />
                My Listings
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 px-6 py-4 text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Settings className="w-5 h-5 inline-block mr-2" />
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'listings' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  My Listings
                </h2>
                <Link
                  to="/sell"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create New Listing
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse flex space-x-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : listings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    You haven't created any listings yet.
                  </p>
                  <Link
                    to="/sell"
                    className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Create your first listing
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <Link
                      key={listing.id}
                      to={`/listing/${listing.id}`}
                      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="flex space-x-4 p-4">
                        <div className="w-24 h-24 flex-shrink-0">
                          {console.log('Image URLs for listing:', listing.imageUrls)} {/* Add this debug line */}
                          <img
                            src={listing.imageUrls && listing.imageUrls.length > 0 && listing.imageUrls[0] !== '' 
                              ? listing.imageUrls[0] 
                              : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UyZThmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5NGEzYjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='}
                            alt={listing.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              console.error('Image failed to load:', (e.target as HTMLImageElement).src); // Add this debug line
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UyZThmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5NGEzYjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {listing.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {listing.description}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {formatPrice(listing.price)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Listed on {formatDate(listing.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Settings
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}