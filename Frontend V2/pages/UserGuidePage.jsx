import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "How do I search for datasets?",
    answer: "Use the search bar found on top of any page in the website. You can enter keywords related to the dataset name, description, or tags. For more specific results, utilize the advanced filters for date, language, data format, etc."
  },
  {
    question: "How do I contribute a dataset?",
    answer: "Navigate to the 'Submit a Dataset' page. You'll find instructions and a form to provide information about your dataset."
  },
  {
    question: "What are tags and how do they help?",
    answer: "Tags are keywords or labels associated with datasets to categorize them and make them more discoverable. You can filter by tags to find datasets relevant to specific topics or characteristics."
  }
];

const UserGuidePage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">User Guide & Help</h1>

      <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">How to Use the Library</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
          Welcome to the Human Feedback Data Library! This guide will help you navigate and utilize our platform effectively.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100">Searching for Datasets</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
          Use the search functionality to find datasets that match your research needs. You can search by keywords, filter by data format, language, licensing, and more.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100">Viewing Dataset Details</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
          Click on any dataset card to view detailed information including description, tags, licensing terms, and access links.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100">Dark/Light Theme</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
          You can switch between light and dark themes using the sun/moon icon in the header.
        </p>
      </section>

      <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b dark:border-gray-700 last:border-b-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-3 px-1 flex justify-between items-center text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-expanded={openFAQ === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium">{faq.question}</span>
                <span>{openFAQ === index ? <RemoveIcon /> : <AddIcon />}</span>
              </button>
              {openFAQ === index && (
                <div id={`faq-answer-${index}`} className="p-3 bg-gray-50 dark:bg-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Helper icons for FAQ accordion
const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const RemoveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);

export default UserGuidePage;
