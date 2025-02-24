import React, { useEffect, useState, useContext } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { Star, ArrowLeft, Globe, Smartphone, DollarSign, Users, TrendingUp, Calendar, Package, Clock } from 'lucide-react';
    import { getListing, addComment, getComments } from '../lib/firebase';
    import { useAuth } from '../contexts/AuthContext';
    import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
    import { db } from '../lib/firebase'; // Import db instance

    interface Listing {
      id: string;
      title: string;
      description: string;
      price: number;
      type: string;
      platform?: string[];
      imageUrls: string[];
      techStack?: string[];
      createdAt: string;
      status: string;
      rating?: number;
      reviews?: number;
      demoUrl?: string;
      transferTime?: string;
    }

    interface Comment {
      id: string;
      userId: string;
      username: string;
      text: string;
      timestamp: any;
    }

    const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
      return (
        <div className="mt-4">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center mb-2">
                <strong className="text-gray-900 dark:text-white">{comment.username}</strong>
                <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                  {new Date(comment.timestamp?.toDate()).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
            </div>
          ))}
        </div>
      );
    };

    const CommentInput: React.FC<{ listingId: string }> = ({ listingId }) => {
      const { currentUser } = useAuth();
      const [commentText, setCommentText] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim() || !currentUser) return;

        setLoading(true);
        setError('');
        try {
          // Fetch user data from Firestore to get the reliable displayName
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            const displayName = userData.displayName; // Use displayName from Firestore

            await addComment(listingId, currentUser.uid, displayName, commentText);
            setCommentText('');
          } else {
            // Fallback: Should not happen normally, but handle for safety
            await addComment(listingId, currentUser.uid, 'Anonymous', commentText);
            setCommentText('');
            console.error("User document not found in Firestore");
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      if (!currentUser) return null;

      return (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            rows={3}
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            disabled={loading || !commentText.trim()}
            className={`mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
              loading || !commentText.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      );
    };

    export default function ListingDetail() {
      const { id } = useParams();
      const [listing, setListing] = useState<Listing | null>(null);
      const [loading, setLoading] = useState(true);
      const [mainImage, setMainImage] = useState<string>('');
      const [imageError, setImageError] = useState<boolean>(false);
      const [comments, setComments] = useState<Comment[]>([]);

      useEffect(() => {
        const fetchListing = async () => {
          if (id) {
            try {
              const data = await getListing(id);
              setListing(data);
              if (data?.imageUrls && data.imageUrls.length > 0) {
                setMainImage(data.imageUrls[0]);
              }
            } catch (error) {
              console.error('Error fetching listing:', error);
            } finally {
              setLoading(false);
            }
          }
        };

        fetchListing();
      }, [id]);

      useEffect(() => {
        if (id) {
          const unsubscribe = getComments(id, setComments);
          return () => unsubscribe(); // Cleanup listener on unmount
        }
      }, [id]);

      const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.src = 'https://placehold.co/800x600/2563eb/ffffff?text=No+Image';
        setImageError(true);
      };

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

      if (loading) {
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Loading...</span>
              </div>
            </div>
          </div>
        );
      }

      if (!listing) {
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Listing not found</h2>
                <Link to="/browse" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
                  Return to Browse
                </Link>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link
                    to="/browse"
                    className="mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </Link>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{listing.title}</h1>
                </div>
                <div className="flex items-center space-x-4">
                  {listing.rating && (
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="text-gray-700 dark:text-gray-300">{listing.rating}</span>
                    </div>
                  )}
                  <span className="text-gray-500 dark:text-gray-400">
                    Listed on {formatDate(listing.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Image Gallery */}
                <div className="mb-8">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="relative">
                      <img
                        src={mainImage || 'https://placehold.co/800x600/2563eb/ffffff?text=No+Image'}
                        alt={listing.title}
                        className="w-full h-[400px] object-cover rounded-2xl"
                        onError={handleImageError}
                      />
                    </div>
                    {!imageError && listing.imageUrls.length > 1 && (
                      <div className="grid grid-cols-4 gap-4">
                        {listing.imageUrls.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setMainImage(image)}
                            className={`relative rounded-lg overflow-hidden ${
                              mainImage === image ? 'ring-2 ring-blue-600' : ''
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${listing.title} thumbnail ${index + 1}`}
                              className="w-full h-20 object-cover"
                              onError={handleImageError}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{listing.description}</p>
                </div>

                {/* Additional Details */}
                {(listing.platform?.length > 0 || listing.techStack?.length > 0) && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technical Details</h2>
                    {listing.platform && listing.platform.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platforms</h3>
                        <div className="flex flex-wrap gap-2">
                          {listing.platform.map((platform, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {listing.techStack && listing.techStack.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {listing.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-50 dark:bg-blue-900 rounded-full text-sm text-blue-700 dark:text-blue-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Comments Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Comments</h2>
                  <CommentList comments={comments} />
                  <CommentInput listingId={id!} />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(listing.price)}
                    </h2>
                    {listing.transferTime && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        Transfer time: {listing.transferTime}
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Buy Now
                    </button>
                    <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
                      Contact Seller
                    </button>
                    {listing.demoUrl && (
                      <a
                        href={listing.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full border border-gray-300 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        View Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Additional Details Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Listing Details
                  </h3>
                  <div className="space-y-4">
                    {listing.type && (
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Package className="w-5 h-5 mr-3" />
                        <span className="capitalize">{listing.type.replace(/-/g, ' ')}</span>
                      </div>
                    )}
                    {listing.platform && listing.platform.length > 0 && (
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Smartphone className="w-5 h-5 mr-3" />
                        <span>{listing.platform.join(', ')}</span>
                      </div>
                    )}
                    {listing.transferTime && (
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Clock className="w-5 h-5 mr-3" />
                        <span>Transfer Time: {listing.transferTime}</span>
                      </div>
                    )}
                    {listing.demoUrl && (
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Globe className="w-5 h-5 mr-3" />
                        <a 
                          href={listing.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Demo
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }
