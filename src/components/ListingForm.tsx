import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createListing } from '../lib/firebase';
import { DollarSign, Upload, Link as LinkIcon, X, Image as ImageIcon } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  assetType: string;
  price: string;
  imageUrls: string[];
  platform: string[];
  demoUrl: string;
  transferTime: string;
}

export default function ListingForm() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    assetType: '',
    price: '',
    imageUrls: [],
    platform: [],
    demoUrl: '',
    transferTime: '48 hours'
  });

  const assetTypes = [
    { id: 'mobile-apps', name: 'Mobile App' },
    { id: 'web-application', name: 'Web Application' },
    { id: 'mobile-games', name: 'Mobile Game' },
    { id: 'computer-games', name: 'Computer Game' },
    { id: 'social-media-channels', name: 'Social Media Channel' }
  ];

  const platformOptions = [
    'iOS',
    'Android',
    'Web',
    'Windows',
    'macOS',
    'Cross-platform'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      try {
        new URL(imageUrl);
        setFormData(prev => ({
          ...prev,
          imageUrls: [...prev.imageUrls, imageUrl.trim()]
        }));
        setImageUrl('');
      } catch {
        alert('Please enter a valid image URL');
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const defaultImages = [
        'https://placehold.co/800x600/2563eb/ffffff?text=Screenshot+1',
        'https://placehold.co/800x600/2563eb/ffffff?text=Screenshot+2',
        'https://placehold.co/800x600/2563eb/ffffff?text=Screenshot+3'
      ];

      const listingData = {
        ...formData,
        price: parseFloat(formData.price),
        status: 'active',
        imageUrls: formData.imageUrls.length > 0 ? formData.imageUrls : defaultImages,
        type: formData.assetType
      };

      await createListing(listingData, currentUser.uid);
      navigate('/profile');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            List Your Digital Asset
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                placeholder="Enter your asset title"
              />
            </div>

            {/* Asset Type Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Asset Type
              </label>
              <select
                name="assetType"
                required
                value={formData.assetType}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              >
                <option value="">Select asset type</option>
                {assetTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                placeholder="Describe your digital asset"
              />
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="Enter price in USD"
                />
              </div>
            </div>

            {/* Demo URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Demo URL
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="Enter demo URL"
                />
              </div>
            </div>

            {/* Image URLs Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image URLs
              </label>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddImage();
                        }
                      }}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                      placeholder="Enter image URL and press Enter or Add"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>

                {formData.imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {formData.imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://placehold.co/400x300/2563eb/ffffff?text=Invalid+Image';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Platforms Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Platforms
              </label>
              <div className="flex flex-wrap gap-2">
                {platformOptions.map(platform => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        platform: prev.platform.includes(platform)
                          ? prev.platform.filter(p => p !== platform)
                          : [...prev.platform, platform]
                      }));
                    }}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      formData.platform.includes(platform)
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Transfer Time Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Transfer Time
              </label>
              <select
                name="transferTime"
                value={formData.transferTime}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              >
                <option value="24 hours">24 hours</option>
                <option value="48 hours">48 hours</option>
                <option value="72 hours">72 hours</option>
                <option value="1 week">1 week</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Creating Listing...' : 'Create Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}