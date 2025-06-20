import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { datasetService } from '../services/datasetService';
import { supabaseService } from '../services/supabaseService';

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

const languages = ["English", "Chinese", "Japanese", "Korean", "Arabic", "Russian", "Telugu", "Turkish", "German", "Spanish", "French", "Multiple", "Other"];

const dataFormats = [
  "accepted/rejected", "Scored", "Classification", "Multiple responses scored", "Prompt and response", "JSONL", "CSV", "JSON", "Text", "XML"
];

const fileTypes = [".jsonl", ".csv", ".json", ".txt", ".zip", ".parquet", ".xlsx"];

const licenses = ["CC BY-NC-SA 4.0", "Apache 2.0", "MIT", "GPLv3", "CC BY 4.0", "Custom (Research Only)", "Other"];

const SubmitDatasetPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: "",
    link: "",
    description: "",
    dataFormat: "",
    dataSize: "",
    numRows: "",
    language: "",
    fileType: "",
    licensing: "",
    originatingPlatform: "",
    categories: [],
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError("Please login to submit a dataset");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const submissionData = {
        ...formData,
        tags: selectedTags,
        numRows: parseInt(formData.numRows) || 0,
        dataSize: formData.dataSize.toString(),
        datePosted: date || new Date().toISOString().split('T')[0],
      };

      // Remove any undefined or empty fields
      Object.keys(submissionData).forEach(key => {
        if (submissionData[key] === '' || submissionData[key] === undefined) {
          delete submissionData[key];
        }
      });

      const response = await datasetService.submitDataset(submissionData);
      
      if (response.success) {
        alert("Dataset submitted successfully! It will be reviewed by our team.");
        resetForm();
        navigate('/datasets');
      } else {
        setError(response.message || "Failed to submit dataset");
      }
    } catch (err) {
      console.error("Error submitting dataset:", err);
      setError(err.response?.data?.message || err.message || "Failed to submit dataset. Please try again.");
    } finally {
      setLoading(false);
    }
  };const resetForm = () => {
    setFormData({
      name: "",
      link: "",
      description: "",
      dataFormat: "",
      dataSize: "",
      numRows: "",
      language: "",
      fileType: "",
      licensing: "",
      originatingPlatform: "",
      categories: [],
    });
    setSelectedTags([]);
    setTagInput("");
    setError("");
    setDate("");
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

        <form onSubmit={handleSubmit} className="space-y-6">          {/* Dataset Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dataset Link <span className="text-red-500">*</span>
            </label>
            <input
              id="link"
              type="url"
              required
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://example.com/dataset"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Dataset Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dataset Name and Author <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          </div>          {/* Number of Rows */}
          <div>
            <label htmlFor="numRows" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Rows <span className="text-red-500">*</span>
            </label>
            <input
              id="numRows"
              type="number"
              required
              value={formData.numRows}
              onChange={(e) => setFormData({ ...formData, numRows: e.target.value })}
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
            </select>            {formData.language === "Other" && (
              <input
                value={formData.otherLanguage}
                onChange={(e) => setFormData({ ...formData, otherLanguage: e.target.value })}
                placeholder="Please specify the language"
                className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            )}
          </div>

          {/* File Type */}
          <div>
            <label htmlFor="fileType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              File Type <span className="text-red-500">*</span>
            </label>
            <select
              id="fileType"
              value={formData.fileType}
              onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select file type</option>
              {fileTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Licensing */}
          <div>
            <label htmlFor="licensing" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Licensing <span className="text-red-500">*</span>
            </label>
            <select
              id="licensing"
              value={formData.licensing}
              onChange={(e) => setFormData({ ...formData, licensing: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select license</option>
              {licenses.map((license) => (
                <option key={license} value={license}>
                  {license}
                </option>
              ))}
            </select>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md">
              <p className="text-red-700 dark:text-red-200">{error}</p>
            </div>
          )}          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full px-6 py-3 font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Dataset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitDatasetPage;
