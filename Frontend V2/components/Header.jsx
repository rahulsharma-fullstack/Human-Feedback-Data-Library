import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { SearchIcon } from './icons/SearchIcon';
import { HamburgerIcon } from './icons/HamburgerIcon';
import { CloseIcon } from './icons/CloseIcon';
import { Theme } from '../types';
import SearchModal from './SearchModal';
import { FILTER_OPTIONS, MOCK_DATASETS } from '../constants';

const initialModalFilters = {
  searchTerm: '',
  dateSort: 'newest',
  language: '',
  dataFormat: '',
  fileType: '',
  licensing: '',
};

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearchIconClick = () => {
    setIsSearchModalOpen(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearchFromModal = (searchCriteria) => {
    navigate('/datasets', { state: { searchCriteria } });
    setIsSearchModalOpen(false);
  };
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <HamburgerIcon className="w-6 h-6" />
            </button>
            <Link to="/" onClick={closeMobileMenu} className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
              Human Feedback Data Library
            </Link>
          </div>
          <nav className="hidden md:flex space-x-2 lg:space-x-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={handleSearchIconClick}
              aria-label="Search datasets"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              aria-label={theme === Theme.LIGHT ? 'Switch to dark theme' : 'Switch to light theme'}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {theme === Theme.LIGHT ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
          <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl p-4 transform transition-transform ease-in-out duration-300">
            <div className="flex justify-between items-center mb-6">
                <Link to="/" onClick={closeMobileMenu} className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    HFDL
                </Link>
                <button onClick={toggleMobileMenu} aria-label="Close menu" className="p-2 text-gray-600 dark:text-gray-300">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)}
        onPerformSearch={handleSearchFromModal}
        initialFilters={initialModalFilters}
      />
    </>
  );
};

export default Header;
