import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">About Us</h1>
      
      <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The Human Feedback Data Library (HFDL) is dedicated to addressing the fragmentation of human feedback (HF) data across various online platforms. Our primary mission is to make this critical data easily discoverable and accessible for AI ethics researchers, developers, and policymakers. We aim to foster a collaborative environment for building safer, more ethical, and human-aligned AI systems.
        </p>
      </section>

      <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">What We Do</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          HFDL serves as a centralized repository and discovery platform for human feedback datasets. We catalog, organize, and provide access to datasets that contain human evaluations, preferences, and feedback on AI system outputs. These datasets are essential for training and evaluating AI systems that are aligned with human values and expectations.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Our platform allows researchers to easily search, filter, and access relevant datasets based on various criteria such as data format, language, licensing, and research domain. We also provide tools for researchers to contribute their own datasets to the community.
        </p>
      </section>

      <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Why It Matters</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          As AI systems become more powerful and widespread, ensuring they are aligned with human values and behave safely becomes crucial. Human feedback data is essential for training these systems to understand human preferences, detect harmful outputs, and improve their behavior. By making this data more accessible, we accelerate progress in AI safety and ethics research.
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
