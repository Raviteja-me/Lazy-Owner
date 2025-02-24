// Firebase Security Rules

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Listings collection rules
    match /listings/{listingId} {
      allow read: if true; // Anyone can read listings
      allow create: if isAuthenticated(); // Only authenticated users can create
      allow update, delete: if isOwner(resource.data.userId); // Only owner can modify
      
      // Validate listing data
      function isValidListing() {
        let requiredFields = [
          'userId', 'type', 'title', 'description', 'price',
          'imageUrls', 'createdAt', 'status'
        ];
        let data = request.resource.data;
        
        return data.keys().hasAll(requiredFields)
          && data.type in ['mobile-app', 'web-app', 'social-media', 'mobile-game', 'computer-game', 'digital-asset']
          && data.price is number && data.price > 0
          && data.imageUrls is list
          && data.status in ['pending', 'active', 'sold'];
      }
    }
  }
}
*/

// Sample listing data structure for reference
export interface Listing {
  id: string;
  userId: string;
  type: 'mobile-app' | 'web-app' | 'social-media' | 'mobile-game' | 'computer-game' | 'digital-asset';
  title: string;
  description: string;
  price: number;
  imageUrls: string[];
  technicalDetails?: string;
  previewUrl?: string;
  metricsUrl?: string;
  transferDetails?: string;
  terms?: string;
  rating?: number;
  reviews?: number;
  createdAt: string;
  status: 'pending' | 'active' | 'sold';
}