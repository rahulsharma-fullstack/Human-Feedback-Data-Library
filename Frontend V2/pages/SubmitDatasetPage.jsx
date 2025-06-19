import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

// Simple date formatter
const formatDate = (date) => {
  if (!date) return "";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

const tagOptions = [
  "Accuracy", "Alignment", "Benchmarking", "Bias", "Classification", "Coding", "Comparison", "DPO",
  "Dialogue", "EcoFriendly", "Educational", "Evaluation", "Expert Feedback", "Fairness", "Feedback",
  "Finance", "Harmless", "Helpfulness", "Human Feedback", "Instruction", "Math", "Medical",
  "Multimodal", "News", "NLP", "NLG", "Preference Learning", "Process Supervision", "QA",
  "Quantitative Reasoning", "Reddit", "Reproducibility", "RLHF", "Safety", "Science", "Search",
  "Sentiment Analysis", "Social Media", "Social Reasoning", "Structured Tasks", "Summarization",
  "Sustainability", "Task Prompts", "Technical Queries", "Text-to-Image", "TOOL/instruction",
  "Toxicity", "Transparency", "Truthfulness", "Visual", "Visual QA", "Writing"
];

const languages = ["English", "Chinese", "Japanese", "Korean", "Arabic", "Russian", "Telugu", "Turkish", "Other"];

const dataFormats = [
  "accepted/rejected", "Scored", "Classification", "Multiple responses scored", "Prompt and response"
];

const SubmitDatasetPage = () => {
  const [formData, setFormData] = useState({
    datasetLink: "",
    datasetName: "",
    description: "",
    dataFormat: "",
    dataSize: "",
    numberOfRows: "",
    language: "",
    otherLanguage: "",
  });
  const [date, setDate] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      datePosted: date,
      tags: selectedTags,
      status: "pending",
    };

    console.log("Submission data:", submissionData);
    alert("Dataset submitted successfully! It will be reviewed by our team.");

    // Reset form
    setFormData({
      datasetLink: "",
      datasetName: "",
      description: "",
      dataFormat: "",
      dataSize: "",
      numberOfRows: "",
      language: "",
      otherLanguage: "",
    });
    setDate("");
    setSelectedTags([]);
  };

  const addTag = (tag) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag) {
        addTag(tag);
        setTagInput("");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Submit a Dataset</h1>
      
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Contribute to the Library</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          We welcome contributions to the Human Feedback Data Library! If you have a dataset that you believe would be valuable to the AI ethics research community, please consider submitting it. Your contribution can help accelerate progress in building safer and more aligned AI systems.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          To submit a dataset, please prepare the following information: dataset name, description, data format, licensing information, access URL, and relevant tags. We review all submissions to ensure they meet our quality and ethical standards.
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Submission Guidelines</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>Datasets must contain human feedback or evaluation data relevant to AI systems</li>
          <li>Data must be properly anonymized and comply with privacy regulations</li>
          <li>Clear licensing terms must be provided</li>
          <li>Datasets should be accessible via a stable URL or repository</li>
          <li>Comprehensive documentation describing the data collection methodology is preferred</li>
        </ul>
      </div>

      {/* Dataset Submission Form */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">Dataset Submission Form</h2>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">Instructions:</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
            <li><strong>Dataset Link:</strong> Provide the direct URL to your dataset.</li>
            <li><strong>Dataset Name:</strong> Enter a concise, descriptive name for the dataset.</li>
            <li><strong>Description:</strong> Include a detailed description of the dataset, its contents, and its purpose.</li>
            <li><strong>Tags:</strong> List relevant tags that best describe your dataset.</li>
            <li><strong>Data Format:</strong> Select the format of your dataset.</li>
            <li><strong>Data Size (MB):</strong> Indicate the size of your dataset in megabytes.</li>
            <li><strong>Number of Rows:</strong> Provide the total number of rows/entries in your dataset.</li>
            <li><strong>Date Posted:</strong> Enter the date when the dataset was first published.</li>
            <li><strong>Language:</strong> Specify the language of the dataset content.</li>          </ul>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-3">
            <strong>Note:</strong> Please ensure your input is accurate and follows the required format. Thank you for your contribution!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dataset Link */}
          <div>
            <label htmlFor="datasetLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dataset Link <span className="text-red-500">*</span>
            </label>
            <input
              id="datasetLink"
              type="url"
              required
              value={formData.datasetLink}
              onChange={(e) => setFormData({ ...formData, datasetLink: e.target.value })}
              placeholder="https://example.com/dataset"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Dataset Name */}
          <div>
            <label htmlFor="datasetName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dataset Name and Author <span className="text-red-500">*</span>
            </label>
            <input
              id="datasetName"
              required
              value={formData.datasetName}
              onChange={(e) => setFormData({ ...formData, datasetName: e.target.value })}
              placeholder="Dataset Name by Author Name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dataset Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the dataset, its contents, and purpose..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags <span className="text-red-500">*</span>
            </label>
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Tags:</p>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyPress}
              placeholder="Type tags and press Enter or comma to add..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />

            {selectedTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Data Format */}
          <div>
            <label htmlFor="dataFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data Format <span className="text-red-500">*</span>
            </label>
            <select
              id="dataFormat"
              value={formData.dataFormat}
              onChange={(e) => setFormData({ ...formData, dataFormat: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select data format</option>
              {dataFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          {/* Data Size */}
          <div>
            <label htmlFor="dataSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data Size (MB) <span className="text-red-500">*</span>
            </label>
            <input
              id="dataSize"
              type="number"
              required
              value={formData.dataSize}
              onChange={(e) => setFormData({ ...formData, dataSize: e.target.value })}
              placeholder="Size in MB"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Number of Rows */}
          <div>
            <label htmlFor="numberOfRows" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Rows <span className="text-red-500">*</span>
            </label>
            <input
              id="numberOfRows"
              type="number"
              required
              value={formData.numberOfRows}
              onChange={(e) => setFormData({ ...formData, numberOfRows: e.target.value })}
              placeholder="Number of rows"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Date Posted */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Posted <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-left flex items-center ${!date ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date ? formatDate(date) : "Pick a date"}
            </button>
            {showDatePicker && (
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setShowDatePicker(false);
                }}
                className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            )}
          </div>

          {/* Language */}
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language <span className="text-red-500">*</span>
            </label>
            <select
              id="language"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select language</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>

            {formData.language === "Other" && (
              <input
                value={formData.otherLanguage}
                onChange={(e) => setFormData({ ...formData, otherLanguage: e.target.value })}
                placeholder="Please specify the language"
                className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Dataset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitDatasetPage;
