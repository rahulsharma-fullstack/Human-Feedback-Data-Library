import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8 text-center">        <nav className="flex flex-wrap justify-center space-x-4 mb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}        </nav>
        <div className="text-sm text-blue-600 dark:text-blue-400">
          Human Feedback Data Library
        </div>
        {/* Copyright and tagline removed as per request */}
      </div>
    </footer>
  );
};

export default Footer;
