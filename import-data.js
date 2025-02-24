import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const firebaseConfig = {
  apiKey: "AIzaSyB--D7pQrmIgl5e6QZm8TRoc-9NEuZ6BKU",
  authDomain: "lazyowner-7571d.firebaseapp.com",
  projectId: "lazyowner-7571d",
  storageBucket: "lazyowner-7571d.appspot.com",
  messagingSenderId: "361474077422",
  appId: "1:361474077422:web:e3c7c5075bd11ae8cf79ff",
  measurementId: "G-RTNJ2KRB5Y"
};

async function importData() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const sampleData = JSON.parse(readFileSync(join(__dirname, 'sample-data.json'), 'utf8'));
  
  for (const listing of sampleData.listings) {
    try {
      await addDoc(collection(db, 'listings'), {
        ...listing,
        createdAt: new Date().toISOString()
      });
      console.log(`Added listing: ${listing.title}`);
    } catch (error) {
      console.error(`Error adding ${listing.title}:`, error);
    }
  }
  
  console.log('Import complete!');
  process.exit(0);
}

importData();