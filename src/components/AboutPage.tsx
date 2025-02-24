import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './Auth/AuthModal';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [intendedPath, setIntendedPath] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  const features = [
    {
      icon: '✅',
      title: 'Ready-to-Launch Businesses',
      description: 'Buy businesses that are already running & generating revenue.'
    },
    {
      icon: '🚀',
      title: 'Super Easy Buying & Selling',
      description: 'Even a beginner can list or buy an app in minutes.'
    },
    {
      icon: '🔒',
      title: 'Safe & Secure Transactions',
      description: 'Funds are held securely until ownership is transferred.'
    },
    {
      icon: '💻',
      title: 'No Coding, No Developers Needed',
      description: 'Buy, publish, and start earning without technical skills.'
    }
  ];

  const personas = [
    {
      icon: '👨‍💻',
      title: 'Developers & Creators',
      description: 'Sell your apps, games, and social media accounts for profit.'
    },
    {
      icon: '🚀',
      title: 'Entrepreneurs & Startups',
      description: 'Buy a ready-made business and focus on marketing & growth.'
    },
    {
      icon: '📲',
      title: 'Social Media Influencers',
      description: 'Monetize your Instagram, YouTube, TikTok, or other platforms.'
    },
    {
      icon: '🛍️',
      title: 'Investors & Business Buyers',
      description: 'Find undervalued digital businesses and scale them.'
    }
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Mobile App Developer',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      quote: 'I sold my fitness tracking app through LazyOwner and the process was incredibly smooth. The platform helped me reach the right buyers and get a great price.',
      achievement: 'Sold a Mobile App for $25,000'
    },
    {
      name: 'Sarah Johnson',
      role: 'Digital Entrepreneur',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      quote: "Buying a web app through LazyOwner was the best business decision I've made. The app was already profitable, and I've managed to double the revenue in just 6 months.",
      achievement: 'Bought a Web App & Doubled Revenue'
    },
    {
      name: 'Michael Chen',
      role: 'Game Developer',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      quote: 'LazyOwner provided the perfect platform to sell my indie game. The secure transaction process gave both me and the buyer peace of mind.',
      achievement: 'Sold a Computer Game for $15,000'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{ minHeight: '75vh' }}>
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-purple-900 to-black opacity-75" />
        <div className="container relative mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <h1 className="text-5xl font-bold mb-8 animate-fade-in">
                Revolutionizing Digital Business Ownership
              </h1>
              <p className="text-lg text-gray-300 mb-12">
                LazyOwner.com is the ultimate marketplace where developers, creators, and entrepreneurs can easily buy and sell ready-made online businesses – from mobile apps to web apps, computer games, and social media accounts. Built for simplicity, designed for success.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleProtectedNavigation('/browse')}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Explore Businesses for Sale
                </button>
                <button
                  onClick={() => handleProtectedNavigation('/sell')}
                  className="border border-purple-600 text-purple-400 px-8 py-3 rounded-lg hover:bg-purple-900/50 transition-colors"
                >
                  List Your Business Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-6/12 px-4 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-6">The Problem We Solve</h2>
              <p className="text-gray-300 mb-6">
                Most developers, app creators, and digital entrepreneurs struggle to monetize their projects beyond publishing. They build amazing products but have no clear path to making money. Meanwhile, thousands of entrepreneurs want to start a business but don't want to build from scratch—they prefer a business that is already running and just needs marketing.
              </p>
              <p className="text-gray-300">
                That's why we created LazyOwner.com—a bridge between creators and entrepreneurs to unlock new income streams and make online business ownership accessible to everyone.
              </p>
            </div>
            <div className="w-full md:w-6/12 px-4">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-video bg-gradient-to-r from-purple-900 to-blue-900 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Vision & Mission</h2>
            <p className="text-2xl text-purple-400 mb-8">
              "To empower every developer and entrepreneur with an effortless way to buy, sell, and scale digital businesses."
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">User-Friendly Marketplace</h3>
              <p className="text-gray-400">Create the most intuitive platform for digital asset transactions.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
              <p className="text-gray-400">Ensure 100% secure transactions for buyers and sellers.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">Easy Business Ownership</h3>
              <p className="text-gray-400">Make business ownership as easy as shopping online.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">Developer Success</h3>
              <p className="text-gray-400">Give developers a way to make real money from their work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Makes LazyOwner Different?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Personas Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Who Can Benefit from LazyOwner?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {personas.map((persona, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{persona.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{persona.title}</h3>
                <p className="text-gray-400">{persona.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Success Stories</h2>
          <div className="relative max-w-4xl mx-auto">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-900 p-8 rounded-xl">
                      <div className="flex items-center mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                          <p className="text-purple-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400">{testimonial.achievement}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}