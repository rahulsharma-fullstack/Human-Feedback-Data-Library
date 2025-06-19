import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import UserGuidePage from './pages/UserGuidePage';
import DatasetsPage from './pages/DatasetsPage';
import SubmitDatasetPage from './pages/SubmitDatasetPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/guide" element={<UserGuidePage />} />
          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/submit" element={<SubmitDatasetPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
