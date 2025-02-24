import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, orderBy, getDocs, addDoc, doc, getDoc, updateDoc, setDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB--D7pQrmIgl5e6QZm8TRoc-9NEuZ6BKU",
  authDomain: "lazyowner-7571d.firebaseapp.com",
  projectId: "lazyowner-7571d",
  storageBucket: "lazyowner-7571d.firebasestorage.app",
  messagingSenderId: "361474077422",
  appId: "1:361474077422:web:e3c7c5075bd11ae8cf79ff",
  measurementId: "G-RTNJ2KRB5Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Collection references
export const COLLECTIONS = {
  LISTINGS: 'listings',
  USERS: 'users',
} as const;

// Helper function to get listings with proper error handling
export async function getListings(categoryFilter?: string) {
  try {
    const listingsRef = collection(db, COLLECTIONS.LISTINGS);
    let q;

    if (categoryFilter && categoryFilter !== 'all') {
      console.log('Category Filter:', categoryFilter);
      
      // First, get all listings to debug
      const allListings = await getDocs(collection(db, COLLECTIONS.LISTINGS));
      console.log('All available types:', allListings.docs.map(doc => doc.data().type));
      
      q = query(
        listingsRef,
        where('type', '==', categoryFilter),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(listingsRef, orderBy('createdAt', 'desc'));
    }

    const snapshot = await getDocs(q);
    const listings = snapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Listing type:', data.type); // Debug individual listing types
      return {
        id: doc.id,
        ...data,
        imageUrls: data.imageUrls?.length > 0 
          ? data.imageUrls 
          : ['https://placehold.co/400x300/2563eb/ffffff?text=No+Image']
      };
    });

    console.log('Retrieved listings:', listings);
    return listings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}

// Helper function to get a single listing
export async function getListing(id: string) {
  try {
    const docRef = doc(db, COLLECTIONS.LISTINGS, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        // Ensure imageUrls is never empty
        imageUrls: data.imageUrls?.length > 0 
          ? data.imageUrls 
          : ['https://placehold.co/400x300/2563eb/ffffff?text=No+Image']
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching listing:', error);
    throw error;
  }
}

// Helper function to create a new listing
export async function createListing(data: any, userId: string) {
  try {
    // Ensure required fields are present
    const listingData = {
      ...data,
      userId,
      createdAt: new Date().toISOString(),
      status: 'active',
      rating: 0,
      reviews: 0,
      // Use provided images or sample screenshots
      imageUrls: Array.isArray(data.imageUrls) && data.imageUrls.length > 0 
        ? data.imageUrls 
        : [
            'https://placehold.co/800x600/2563eb/ffffff?text=Screenshot+1',
            'https://placehold.co/800x600/2563eb/ffffff?text=Screenshot+2',
            'https://placehold.co/800x600/2563eb/ffffff?text=Screenshot+3'
          ],
      type: data.assetType || 'other'
    };

    console.log('Creating listing with data:', listingData);

    const docRef = await addDoc(collection(db, COLLECTIONS.LISTINGS), listingData);
    
    // Update user's listings array
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const listings = userData.listings || [];
      await updateDoc(userRef, {
        listings: [...listings, docRef.id]
      });
    } else {
      await setDoc(userRef, {
        listings: [docRef.id],
        createdAt: new Date().toISOString()
      });
    }

    return docRef;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
}

// Helper function to get user's listings
export async function getUserListings(userId: string) {
  try {
    console.log('Fetching listings for user:', userId);
    const listingsRef = collection(db, COLLECTIONS.LISTINGS);
    
    const q = query(
      listingsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const listings = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Ensure imageUrls is never empty
        imageUrls: data.imageUrls?.length > 0 
          ? data.imageUrls 
          : ['https://placehold.co/400x300/2563eb/ffffff?text=No+Image']
      };
    });

    console.log('Found listings:', listings);
    return listings;
  } catch (error) {
    console.error('Error fetching user listings:', error);
    throw error;
  }
}

// --- Comments Functions ---

// Add a comment to a listing
export async function addComment(listingId: string, userId: string, username: string, text: string) {
  const commentsRef = collection(db, COLLECTIONS.LISTINGS, listingId, 'comments');
  return addDoc(commentsRef, {
    userId,
    username,
    text,
    timestamp: Timestamp.now(),
  });
}

// Get comments for a listing with real-time updates
export function getComments(listingId: string, callback: (comments: any[]) => void) {
    const commentsRef = collection(db, COLLECTIONS.LISTINGS, listingId, 'comments');
    const q = query(commentsRef, orderBy('timestamp', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(comments);
    });
}
