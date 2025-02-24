import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { sampleListings } from './sampleData';

export async function importSampleListings() {
  try {
    const listingsCollection = collection(db, 'listings');
    
    for (const listing of sampleListings) {
      const listingData = {
        ...listing,
        createdAt: new Date().toISOString(),
        userId: 'system', // You can change this to a specific user ID if needed
      };
      
      await addDoc(listingsCollection, listingData);
    }
    
    console.log('Sample listings imported successfully!');
  } catch (error) {
    console.error('Error importing sample listings:', error);
    throw error;
  }
}