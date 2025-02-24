import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, DollarSign, ArrowRight, TrendingUp, Shield, Users, Zap, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './Auth/AuthModal';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [intendedPath, setIntendedPath] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleProtectedNavigation = (path: string) => {
    if (!currentUser) {
      setIntendedPath(path);
      setIsAuthModalOpen(true);
    } else {
      navigate(path);
    }
  };

  const handleAuthSuccess = () => {
    if (intendedPath) {
      navigate(intendedPath);
      setIntendedPath(null);
    }
    setIsAuthModalOpen(false);
  };

  // Modify the Sign In button click handler
  <button
    onClick={() => {
      setIntendedPath(null); // Reset intended path for direct sign in
      setIsAuthModalOpen(true);
    }}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
  >
    Sign In
  </button>

  const features = [
    {
      icon: TrendingUp,
      title: 'Digital Assets Marketplace',
      description: 'Browse through a curated selection of profitable online businesses and digital assets.',
    },
    {
      icon: Shield,
      title: 'Verified Revenue',
      description: 'All listings are verified with proof of revenue and performance metrics.',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Get guidance from our team of experts throughout the buying process.',
    },
    {
      icon: Zap,
      title: 'Fast Transactions',
      description: 'Quick and secure transactions with professional support.',
    },
  ];

  const categories = [
    { name: 'Mobile Apps', count: 156, image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1920&q=80' },
    { name: 'SaaS Products', count: 243, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80' },
    { name: 'E-commerce', count: 189, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80' },
    { name: 'Social Media Channels', count: 167, image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1920&q=80' },
    { name: 'Computer Games', count: 92, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1920&q=80' },
    { name: 'Mobile Games', count: 78, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=80' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">L</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">azyOwner</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
              <button
                onClick={() => handleProtectedNavigation('/browse')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Buy a Business
              </button>
              <button
                onClick={() => handleProtectedNavigation('/sell')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Sell Your Business
              </button>
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Contact
              </Link>
              {currentUser ? (
                <Link
                  to="/profile"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Profile
                </Link>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleProtectedNavigation('/browse');
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Buy a Business
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleProtectedNavigation('/sell');
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sell Your Business
              </button>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {currentUser ? (
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2070&q=80')"
        }}>
          <span className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-bold text-5xl">
                  Ready-Made Success Awaits
                </h1>
                <p className="mt-4 text-lg text-gray-200">
                  Skip the startup hassle. Buy or sell established online businesses with proven revenue. Let's make your next move simple and profitable.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <button
                    onClick={() => handleProtectedNavigation('/browse')}
                    className="bg-blue-600 text-white active:bg-blue-700 font-bold uppercase text-base px-8 py-3 rounded-lg shadow-lg hover:shadow-xl outline-none focus:outline-none ease-linear transition-all duration-150"
                  >
                    Buy a Business
                  </button>
                  <button
                    onClick={() => handleProtectedNavigation('/sell')}
                    className="bg-white text-blue-600 active:bg-gray-100 font-bold uppercase text-base px-8 py-3 rounded-lg shadow-lg hover:shadow-xl outline-none focus:outline-none ease-linear transition-all duration-150"
                  >
                    Sell Your Business
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
                Browse by Category
              </h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600 dark:text-gray-300">
                Explore our curated selection of digital assets across various categories
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleProtectedNavigation(`/browse/${category.name.toLowerCase().replace(' ', '-')}`)}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0"></div>
                </div>
                <div className="relative p-6 flex flex-col h-full min-h-[200px] justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400">{category.count} Listings</span>
                    <ArrowRight className="w-5 h-5 text-blue-400 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
                Why Choose LazyOwner?
              </h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600 dark:text-gray-300">
                We make buying and selling digital assets simple, secure, and transparent
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  <feature.icon className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-blue-600">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blue-600 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
              <h2 className="text-4xl font-semibold text-white">
                Ready to sell your digital asset?
              </h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-blue-200">
                Join thousands of successful entrepreneurs who have sold their digital assets on LazyOwner.
                Get started today and find the perfect buyer for your business.
              </p>
              <button
                onClick={() => handleProtectedNavigation('/sell')}
                className="bg-white text-blue-600 active:bg-gray-100 font-bold uppercase text-base px-8 py-3 rounded-lg shadow-lg hover:shadow-xl outline-none focus:outline-none ease-linear transition-all duration-150 inline-flex items-center"
              >
                <span>Get Started</span>
                <Zap className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}