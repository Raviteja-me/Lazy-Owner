import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ListingForm from './components/ListingForm';
import BrowsePage from './components/BrowsePage';
import ListingDetail from './components/ListingDetail';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UserProfile from './components/UserProfile';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

const HomePage = React.lazy(() => import('./components/HomePage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense>} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/listing/:id" element={<ListingDetail />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="/sell"
        element={
          <ProtectedRoute>
            <ListingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
