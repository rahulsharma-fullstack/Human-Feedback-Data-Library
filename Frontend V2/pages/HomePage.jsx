import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white leading-tight">
        Welcome to the Human Feedback Data Library
      </h1>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
        Discover, access, and contribute to a growing collection of human feedback datasets. 
        Empowering AI ethics researchers and developers to build more responsible and aligned AI systems.
      </p>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to="/datasets"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 text-lg"
        >
          Explore Datasets
        </Link>
        <Link
          to="/submit"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 text-lg"
        >
          Contribute Data
        </Link>
      </div>
      <div className="mt-16 max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Mission</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Our mission is to centralize and democratize access to diverse human feedback data, fostering transparency and collaboration in AI development. We believe that by making these crucial datasets readily available, we can accelerate research into AI safety, fairness, and alignment.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
