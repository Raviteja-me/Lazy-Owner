import React, { useState, useEffect } from 'react';
import { Search, Star, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './Auth/AuthModal';
import { getListings } from '../lib/firebase';

interface Listing {
  id: string;
  title: string;                    // App name
  description: string;              // App description and how it works
  type: string;                     // Category (mobile-app, web-app, etc.)
  price: number;
  imageUrls: string[];             // App screenshots
  appIcon: string;                 // App icon URL
  
  // App Technical Details
  platform: string[];              // iOS, Android, Cross-platform
  techStack: {
    frontend: string[];           // Frontend technologies
    backend: string[];           // Backend technologies
    database: string[];         // Database technologies
    apis: string[];            // Third-party integrations
  };
  
  // Business & Monetization
  businessModel: string[];        // How to make money (ads, in-app purchases, etc.)
  monetizationDetails: string;    // Detailed explanation of revenue generation
  
  // App Information
  developedYear: string;          // When the app was developed
  lastUpdated: string;           // Last update date
  appSize: string;              // Size of the app
  languages: string[];         // Supported languages
  
  // Transfer Details
  transferTime: string;         // Estimated transfer time
  modificationsIncluded: {
    available: boolean;
    details: string;
    timeRequired: string;
  };
  
  // Seller Information
  seller: {
    name: string;
    country: string;
    currency: string;
    languages: string;
  };
  
  // Testing & Verification
  demoUrl: string;              // APK download or test link
  downloadUrl: string;        // App review or demo video
  website: string[];     // Existing store listings (if any)
  
  // Purchase Information
  paymentMethods: string[];    // Accepted payment methods
      
  priceNegotiable: boolean;
  
  // What's Included
  includedItems: string[];   // Source code, assets, documentation, etc.
  supportIncluded: {
    duration: string;
    type: string;
  };

  // Status and Rating
  status: string;           // active, sold, etc.
  rating?: number;
  reviews?: number;
}

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Remove the duplicate useEffect and keep only this one
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const fetchedListings = await getListings(selectedCategory);
        
        console.log('Fetched listings:', fetchedListings);
        console.log('Selected category:', selectedCategory);
        
        // Filter by search query if present
        const filteredListings = searchQuery
          ? fetchedListings.filter(listing =>
              listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              listing.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : fetchedListings;
      
        setListings(filteredListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchListings();
  }, [selectedCategory, searchQuery]);
  
  // Update categories array to match Firebase types
  const categories = [
    { 
      id: 'mobile-apps', 
      name: 'Mobile App', 
      description: 'Android, iOS, or Cross-platform applications',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'web-application', // Changed from 'web-app' to match database
      name: 'Web Application', 
      description: 'Browser-based software applications',
      color: 'from-purple-500 to-indigo-600'
    },
    { 
      id: 'mobile-games', // Changed from 'mobile-game' to match database
      name: 'Mobile Game', 
      description: 'Games for mobile platforms',
      color: 'from-orange-500 to-red-500'
    },
    { 
      id: 'computer-games', // Changed from 'computer-game' to match database
      name: 'Computer Game', 
      description: 'Games for desktop platforms',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'social-media-channels', // Changed from 'social-media' to match database
      name: 'Social Media Channels', 
      description: 'View all Social media Channels listings',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleListingClick = (listingId: string) => {
    if (!currentUser) {
      setSelectedListingId(listingId);
      setIsAuthModalOpen(true);
    } else {
      navigate(`/listing/${listingId}`);
    }
  };

  const handleAuthSuccess = () => {
    if (selectedListingId) {
      navigate(`/listing/${selectedListingId}`);
      setSelectedListingId(null);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="relative flex-1 max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search digital assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  group relative overflow-hidden rounded-xl bg-gradient-to-r shadow-lg hover:shadow-xl transition-all duration-300
                  ${selectedCategory === category.id ? 'ring-2 ring-blue-500 transform scale-[1.02]' : ''}
                `}
                style={{ minHeight: '160px' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm flex-grow">{category.description}</p>
                  <div className="mt-4 flex items-center text-white/90">
                    <span className="text-sm">Browse category</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Listings */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory 
                ? `${categories.find(c => c.id === selectedCategory)?.name} Listings`
                : 'All Listings'}
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                View All
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery
                  ? 'No listings found matching your search criteria'
                  : selectedCategory
                  ? 'No listings available in this category yet'
                  : 'No listings available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => handleListingClick(listing.id)}
                  className="text-left group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={listing.imageUrls?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
                      alt={listing.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {categories.find(c => c.id === listing.type)?.name || listing.type}
                      </span>
                      {listing.rating && (
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="ml-1 text-xs text-gray-600 dark:text-gray-300">{listing.rating}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{listing.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{listing.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatPrice(listing.price)}</span>
                      {listing.reviews && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">{listing.reviews.toLocaleString()} reviews</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}