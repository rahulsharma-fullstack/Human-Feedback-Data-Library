import React, { useState } from "react"
import { Calendar as CalendarIcon, FileText } from "lucide-react"
import "./SubmitDataset.css"

// Simple date formatter
const formatDate = (date) => {
  if (!date) return ""
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

const tagOptions = [
  "Accuracy",
  "Alignment",
  "Benchmarking",
  "Bias",
  "Classification",
  "Coding",
  "Comparison",
  "DPO",
  "Dialogue",
  "EcoFriendly",
  "Educational",
  "Evaluation",
  "Expert Feedback",
  "Fairness",
  "Feedback",
  "Finance",
  "Harmless",
  "Helpfulness",
  "Human Feedback",
  "Instruction",
  "Math",
  "Medical",
  "Multimodal",
  "News",
  "NLP",
  "NLG",
  "Preference Learning",
  "Process Supervision",
  "QA",
  "Quantitative Reasoning",
  "Reddit",
  "Reproducibility",
  "RLHF",
  "Safety",
  "Science",
  "Search",
  "Sentiment Analysis",
  "Social Media",
  "Social Reasoning",
  "Structured Tasks",
  "Summarization",
  "Sustainability",
  "Task Prompts",
  "Technical Queries",
  "Text-to-Image",
  "TOOL/instruction",
  "Toxicity",
  "Transparency",
  "Truthfulness",
  "Visual",
  "Visual QA",
  "Writing",
]

const languages = ["English", "Chinese", "Japanese", "Korean", "Arabic", "Russian", "Telugu", "Turkish", "Other"]

const dataFormats = [
  "accepted/rejected",
  "Scored",
  "Classification",
  "Multiple responses scored",
  "Prompt and response",
]

export default function SubmitDatasetPage() {
  const [formData, setFormData] = useState({
    datasetLink: "",
    datasetName: "",
    description: "",
    tags: "",
    dataFormat: "",
    dataSize: "",
    numberOfRows: "",
    language: "",
    otherLanguage: "",
  })
  const [date, setDate] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [tagInput, setTagInput] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const submissionData = {
      ...formData,
      datePosted: date,
      tags: selectedTags,
      status: "pending",
    }

    // Here you would typically send the data to your backend
    console.log("Submission data:", submissionData)

    // Show success message or redirect
    alert("Dataset submitted successfully! It will be reviewed by our team.")

    // Reset form
    setFormData({
      datasetLink: "",
      datasetName: "",
      description: "",
      tags: "",
      dataFormat: "",
      dataSize: "",
      numberOfRows: "",
      language: "",
      otherLanguage: "",
    })
    setDate("")
    setSelectedTags([])
  }

  const addTag = (tag) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove))
  }

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const tag = tagInput.trim()
      if (tag) {
        addTag(tag)
        setTagInput("")
      }
    }
  }

  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-branding">
              <FileText className="icon-large" />
              <div>
                <h1 className="header-title">OpenFeedbackVault</h1>
                <p className="header-subtitle">A Human-Centric AI Feedback Library.</p>
              </div>
            </div>
            <nav className="header-nav">
              <a href="/" className="nav-link">
                Home
              </a>
              <a href="/datasets" className="nav-link">
                Datasets
              </a>
              <a href="/about" className="nav-link">
                About Us
              </a>
              <a href="/guide" className="nav-link">
                User Guide & Help
              </a>
              <a href="/submit-dataset" className="nav-link active">
                Submit a Dataset
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-container">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">OpenFeedbackVault Dataset Submission</h2>
            <p className="card-description">
              Welcome! Please use this form to submit your dataset. Your submission will help us enhance our database
              and provide valuable resources to the community.
            </p>
          </div>

          <div className="card-content">
            <div className="instructions-box">
              <h3 className="instructions-title">Instructions:</h3>
              <ul className="instructions-list">
                <li>
                  <strong>Dataset Link:</strong> Provide the direct URL to your dataset.
                </li>
                <li>
                  <strong>Dataset Name:</strong> Enter a concise, descriptive name for the dataset.
                </li>
                <li>
                  <strong>Description:</strong> Include a detailed description of the dataset, its contents, and its
                  purpose.
                </li>
                <li>
                  <strong>Tags:</strong> List relevant tags that best describe your dataset, separated by commas (e.g.,
                  RLHF, NLG, Medical). Tags can include topics, use cases, or relevant fields.
                </li>
                <li>
                  <strong>Data Format:</strong> Select the format of your dataset
                </li>
                <li>
                  <strong>Data Size (MB):</strong> Indicate the size of your dataset in megabytes.
                </li>
                <li>
                  <strong>Number of Rows:</strong> Provide the total number of rows/entries in your dataset.
                </li>
                <li>
                  <strong>Date Posted:</strong> Enter the date when the dataset was first published.
                </li>
                <li>
                  <strong>Language:</strong> Specify the language of the dataset content.
                </li>
              </ul>
              <p className="instructions-note">
                <strong>Note:</strong> Please ensure your input is accurate and follows the required format. For tags,
                use only letters, numbers, and underscores. Tags should be relevant to the dataset's content.
              </p>
              <p className="instructions-note">
                Thank you for your contribution! Your submission will be reviewed, and once approved, it will be made
                available to the community.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="form">
              {/* Dataset Link */}
              <div className="form-group">
                <label htmlFor="datasetLink" className="label">
                  Please provide the link to the dataset. <span className="required">*</span>
                </label>
                <input
                  id="datasetLink"
                  type="url"
                  required
                  value={formData.datasetLink}
                  onChange={(e) => setFormData({ ...formData, datasetLink: e.target.value })}
                  placeholder="https://example.com/dataset"
                  className="input"
                />
              </div>

              {/* Dataset Name */}
              <div className="form-group">
                <label htmlFor="datasetName" className="label">
                  Please enter the dataset's name, and the author of the dataset.{" "}
                  <span className="required">*</span>
                </label>
                <input
                  id="datasetName"
                  required
                  value={formData.datasetName}
                  onChange={(e) => setFormData({ ...formData, datasetName: e.target.value })}
                  placeholder="Dataset Name by Author Name"
                  className="input"
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description" className="label">
                  Please enter a description for the dataset. Provide any information you think would be useful and
                  relevant for engineers who want to use the data. <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the dataset, its contents, and purpose..."
                  className="textarea"
                />
              </div>

              {/* Tags */}
              <div className="form-group">
                <label className="label">
                  Please enter a comma separated list of tags you think are relevant to the data.{" "}
                  <span className="required">*</span>
                </label>
                <div>
                  <div className="tag-options-box">
                    <p className="tag-options-title">Tag Options:</p>
                    <div className="tag-options-list">
                      {tagOptions.map((tag, index) => (
                        <span key={tag}>
                          <button
                            type="button"
                            onClick={() => addTag(tag)}
                            className="tag-option-button"
                          >
                            {tag}
                          </button>
                          {index < tagOptions.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>

                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyPress}
                    placeholder="Type tags and press Enter or comma to add..."
                    className="input"
                    style={{ marginTop: '12px' }}
                  />

                  {selectedTags.length > 0 && (
                    <div className="selected-tags">
                      {selectedTags.map((tag) => (
                        <span key={tag} className="tag-badge">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="tag-remove"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Data Format */}
              <div className="form-group">
                <label htmlFor="dataFormat" className="label">
                  Select the format of the dataset. <span className="required">*</span>
                </label>
                <select
                  id="dataFormat"
                  value={formData.dataFormat}
                  onChange={(e) => setFormData({ ...formData, dataFormat: e.target.value })}
                  className="select"
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
              <div className="form-group">
                <label htmlFor="dataSize" className="label">
                  Please enter the size of the dataset in megabytes. <span className="required">*</span>
                </label>
                <input
                  id="dataSize"
                  type="number"
                  required
                  value={formData.dataSize}
                  onChange={(e) => setFormData({ ...formData, dataSize: e.target.value })}
                  placeholder="Size in MB"
                  className="input"
                />
              </div>

              {/* Number of Rows */}
              <div className="form-group">
                <label htmlFor="numberOfRows" className="label">
                  Please enter the number of rows in the dataset. <span className="required">*</span>
                </label>
                <input
                  id="numberOfRows"
                  type="number"
                  required
                  value={formData.numberOfRows}
                  onChange={(e) => setFormData({ ...formData, numberOfRows: e.target.value })}
                  placeholder="Number of rows"
                  className="input"
                />
              </div>

              {/* Date Posted */}
              <div className="form-group">
                <label className="label">
                  Please enter the date the dataset was created. <span className="required">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={`date-picker-button ${!date ? 'placeholder' : ''}`}
                >
                  <CalendarIcon className="icon-small" />
                  {date ? formatDate(date) : "Pick a date"}
                </button>
                {showDatePicker && (
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value)
                      setShowDatePicker(false)
                    }}
                    className="date-input"
                    required
                  />
                )}
              </div>

              {/* Language */}
              <div className="form-group">
                <label htmlFor="language" className="label">
                  Please select the language of the dataset. <span className="required">*</span>
                </label>
                <select
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="select"
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
                    className="input"
                    style={{ marginTop: '8px' }}
                  />
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" className="submit-button">
                  Submit Dataset
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}