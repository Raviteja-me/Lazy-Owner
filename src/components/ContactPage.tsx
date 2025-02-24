import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import { Mail, Phone, MessageCircle, Globe, MapPin, Send, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
    import logo from '../assets/logo.svg';

    export default function ContactPage() {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      const [showSuccess, setShowSuccess] = useState(false);

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
        setFormData({ name: '', email: '', phone: '', message: '' });
      };

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const contactInfo = [
        {
          icon: <Mail className="w-6 h-6" />,
          title: 'Email',
          content: 'Help@fastasticsolutions.com',
          link: 'mailto:Help@fastasticsolutions.com'
        },
        {
          icon: <Phone className="w-6 h-6" />,
          title: 'Phone',
          content: '+917483092794',
          link: 'tel:+917483092794'
        },
        {
          icon: <MessageCircle className="w-6 h-6" />,
          title: 'WhatsApp',
          content: '+917483092794',
          link: 'https://wa.me/917483092794'
        },
        {
          icon: <Globe className="w-6 h-6" />,
          title: 'Website',
          content: 'www.fastasticsolutions.com',
          link: 'https://www.fastasticsolutions.com'
        }
      ];

      return (
        <div className="min-h-screen bg-gray-900 text-white">
          <div className="relative overflow-hidden bg-gradient-to-b from-purple-900 to-gray-900 py-24">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0tMjAgMGgtMnYtMmgydjJ6bTIwLTIwaC0ydi0yaDJ2MnptLTIwIDBoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
            <div className="container mx-auto px-4 relative">

              {/* Logo */}
              <div className="text-center mb-8">
                <img src={logo} alt="Fastastic Solutions Logo" className="mx-auto h-24" />
              </div>

              <h1 className="text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                We're Here to Help!
              </h1>
              <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
                Got a question? Need assistance? Want to collaborate? Contact us and we'll get back to you as soon as possible!
              </p>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl hover:bg-gray-800/70 transition-all group"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <h3 className="text-xl font-semibold ml-4">{info.title}</h3>
                    </div>
                    <p className="text-gray-300">{info.content}</p>
                  </a>
                ))}
              </div>

              {/* Contact Form Section */}
              <div className="max-w-2xl mx-auto mt-24 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
                {showSuccess && (
                  <div className="mt-4 p-4 bg-green-600/20 border border-green-500 rounded-lg text-green-400">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
              </div>

              {/* Location Section */}
              <div className="max-w-4xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-1 gap-8">
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl">
                  <div className="flex items-center mb-6">
                    <MapPin className="w-6 h-6 text-purple-400 mr-3" />
                    <h2 className="text-2xl font-bold">Location</h2>
                  </div>
                  <p className="text-gray-300 mb-2">LazyOwner Headquarters</p>
                  <p className="text-gray-400">123 Digital Avenue</p>
                  <p className="text-gray-400">Tech City, TC 12345</p>
                  <p className="text-gray-400">United States</p>
                </div>
              </div>

              {/* Social Media Links (Placeholder) */}
              <div className="max-w-4xl mx-auto mt-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
                <div className="flex justify-center space-x-6">
                  <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-purple-500">
                    <Facebook className="w-8 h-8" />
                  </a>
                  <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-purple-500">
                    <Twitter className="w-8 h-8" />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-purple-500">
                    <Linkedin className="w-8 h-8" />
                  </a>
                  <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-purple-500">
                    <Instagram className="w-8 h-8" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      );
    }
