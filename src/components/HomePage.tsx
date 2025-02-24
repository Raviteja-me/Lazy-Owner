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
  const handleSignInClick = () => {
      setIntendedPath(null); // Reset intended path for direct sign in
      setIsAuthModalOpen(true);
    }
  

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
      { name: 'Mobile Apps', icon: '📱', description: 'Discover innovative mobile applications.', path: '/browse/mobile-apps' },
      { name: 'Web Apps', icon: '🌐', description: 'Explore cutting-edge web applications.', path: '/browse/web-apps' },
      { name: 'Computer Games', icon: '🎮', description: 'Find exciting computer games.', path: '/browse/computer-games' },
      { name: 'Mobile Games', icon: '📲', description: 'Browse popular mobile games.', path: '/browse/mobile-games' },
      { name: 'Social Media Channels', icon: '📢', description: 'Acquire influential social media channels.', path: '/browse/social-media-channels' },
  ];

    const steps = [
    { icon: '🔍', text: 'Find a business you like.' },
    { icon: '🔒', text: 'Secure your payment with LazyOwner.com.' },
    { icon: '🚀', text: 'Get ownership transferred instantly.' },
  ];

    const benefits = [
        { icon: '✅', title: '100% Secure Transactions', description: 'Funds are held securely until ownership is transferred.' },
        { icon: '⏱️', title: 'Instant Ownership Transfers', description: 'No hassle, no delays.' },
        { icon: '🔍', title: 'Verified Listings Only', description: 'Every business is checked for authenticity.' },
        { icon: '🚀', title: 'Easy & Fast Selling Process', description: 'Upload your business in minutes.' },
    ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-manrope">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-purple-500">L</span>
                <span className="text-xl font-bold text-white">azyOwner</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-300 hover:text-purple-400">
                Home
              </Link>
              <button
                onClick={() => handleProtectedNavigation('/browse')}
                className="text-gray-300 hover:text-purple-400"
              >
                Buy a Business
              </button>
              <button
                onClick={() => handleProtectedNavigation('/sell')}
                className="text-gray-300 hover:text-purple-400"
              >
                Sell Your Business
              </button>
              <Link to="/about" className="text-gray-300 hover:text-purple-400">
                About
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-purple-400">
                Contact
              </Link>
              {currentUser ? (
                <Link
                  to="/profile"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Profile
                </Link>
              ) : (
                <button
                  onClick={handleSignInClick}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-purple-400"
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
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleProtectedNavigation('/browse');
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
              >
                Buy a Business
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleProtectedNavigation('/sell');
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
              >
                Sell Your Business
              </button>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {currentUser ? (
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
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
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{ minHeight: '75vh' }}>
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-purple-900 to-black" />
        <div className="container relative mx-auto z-10">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <h1 className="text-white font-bold text-5xl">
                Buy & Sell Ready-Made Digital Assets in Minutes!
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                LazyOwner.com is the easiest way to buy or sell apps, web apps, games, and social media channels. Instant transactions, secure ownership transfers, and zero hassle!
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => handleProtectedNavigation('/browse')}
                  className="bg-purple-600 text-white active:bg-purple-700 font-bold uppercase text-base px-8 py-3 rounded-lg shadow-lg hover:shadow-xl outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Explore Listings
                </button>
                <button
                  onClick={() => handleProtectedNavigation('/sell')}
                  className="bg-transparent border border-purple-600 text-purple-600 active:bg-purple-100 font-bold uppercase text-base px-8 py-3 rounded-lg shadow-lg hover:shadow-xl outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Sell Your Business
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold">
                Browse Digital Assets
              </h2>
              <p className="text-lg leading-relaxed m-4 text-gray-400">
                Explore our curated selection of digital assets across various categories.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleProtectedNavigation(category.path)}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 bg-gray-800"
              >
                <div className="p-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-xl font-bold text-white mt-4 mb-2">{category.name}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings Section - Placeholder */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">Featured Listings</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-400">
                Check out our top apps, websites, and businesses available for sale.
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Carousel implementation coming soon...</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold">How It Works</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-400">
                Simple 3-step process to buy or sell your digital assets.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            {steps.map((step, index) => (
              <div key={index} className="w-full md:w-1/3 px-4 text-center">
                <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-purple-600 text-white text-2xl mb-4">
                  {step.icon}
                </div>
                <p className="text-lg">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose LazyOwner? Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">Why Choose LazyOwner?</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-400">
                Key benefits of using LazyOwner for buying and selling digital assets.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-6 bg-gray-700 rounded-xl shadow-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white text-2xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold text-white">Ready to Get Started?</h2>
          <p className="text-lg leading-relaxed mt-4 mb-8 text-white">
            Join LazyOwner today and start buying or selling digital assets with ease!
          </p>
          <button
            onClick={() => handleProtectedNavigation('/browse')}
            className="bg-white text-purple-600 active:bg-gray-100 font-bold uppercase text-base px-8 py-3 rounded-lg shadow-lg hover:shadow-xl outline-none focus:outline-none ease-linear transition-all duration-150"
          >
            Explore Listings
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
              <Link to="/" className="flex items-center justify-center md:justify-start">
                <span className="text-2xl font-bold text-purple-500">L</span>
                <span className="text-xl font-bold text-white">azyOwner</span>
              </Link>
            </div>
            <div className="w-full md:w-auto text-center md:text-right">
              <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
                <li><Link to="/about" className="text-gray-400 hover:text-purple-400">About</Link></li>
                <li><Link to="/faqs" className="text-gray-400 hover:text-purple-400">FAQs</Link></li>
                <li><Link to="/support" className="text-gray-400 hover:text-purple-400">Support</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-purple-400">Terms</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-purple-400">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400">© {new Date().getFullYear()} LazyOwner.com. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
