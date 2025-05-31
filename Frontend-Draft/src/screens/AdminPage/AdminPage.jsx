
/**
 * AdminPage.jsx
 * 
 * Admin dashboard for managing dataset submissions in the OpenFeedbackVault application.
 * This component provides a comprehensive interface for administrators to:
 * 
 * Features:
 * - Review dataset submissions from the community
 * - Filter submissions by status (pending, approved, rejected)
 * - View detailed information about each submission in a modal
 * - Approve or reject pending submissions
 * - See statistics overview of all submissions
 * - Logout functionality
 * 
 * Structure:
 * - Header: Branding and navigation
 * - Stats Cards: Overview of submission counts
 * - Tabs: Filter submissions by status
 * - Submission Cards: Display individual submissions
 * - Modal: Detailed view of selected submission
 * 
 * Data Flow:
 * - Uses React hooks for state management
 * - Mock data simulates API responses
 * - Status changes update the submissions array
 * - Context provides authentication functionality
 */

// React imports
import { useState } from "react"
// Icon imports from Lucide React - provides consistent iconography
import { CheckCircle, XCircle, Clock, Eye, FileText, Calendar, Database, Tag, Globe, Hash, X, LogOut } from "lucide-react"
// Authentication context for user management
import { useAuth } from "../../contexts/AuthContext"
// Component-specific styles
import "./AdminPage.css"

/**
 * Simple date formatter utility function
 * Converts Date objects to human-readable format (e.g., "January 15, 2024")
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

// Mock data representing dataset submissions - in production, this would come from an API
const mockSubmissions = [
  {
    id: "1",
    datasetLink: "https://huggingface.co/datasets/example/rlhf-dataset",
    datasetName: "RLHF Preference Dataset by OpenAI",
    description:
      "A comprehensive dataset containing human preferences for reinforcement learning from human feedback. This dataset includes paired responses with human rankings, covering various topics including coding, creative writing, and factual questions.",
    tags: ["RLHF", "Human Feedback", "Preference Learning", "Alignment"],
    dataFormat: "accepted/rejected",
    dataSize: "2500",
    numberOfRows: "50000",
    datePosted: new Date("2024-01-15"),
    language: "English",
    status: "pending", // Status can be: pending, approved, or rejected
    submittedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    datasetLink: "https://github.com/example/medical-qa-dataset",
    datasetName: "Medical Q&A Dataset by Stanford Medical",
    description:
      "A curated collection of medical question-answer pairs reviewed by medical professionals. Includes questions about symptoms, treatments, and general medical knowledge.",
    tags: ["Medical", "QA", "Healthcare", "Expert Feedback"],
    dataFormat: "Prompt and response",
    dataSize: "1200",
    numberOfRows: "25000",
    datePosted: new Date("2024-01-10"),
    language: "English",
    status: "approved",
    submittedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    datasetLink: "https://example.com/coding-dataset",
    datasetName: "Code Generation Dataset by DeepMind",
    description:
      "Programming problems with multiple solution approaches, including human-written and AI-generated code with quality scores.",
    tags: ["Coding", "Programming", "Scored", "Technical"],
    dataFormat: "Multiple responses scored",
    dataSize: "3200",
    numberOfRows: "75000",
    datePosted: new Date("2024-01-05"),
    language: "English",
    status: "rejected",
    submittedAt: new Date("2024-01-16"),
  },
]

/**
 * AdminPage Component
 * Main component for the admin dashboard where admins can review and manage dataset submissions
 * Features:
 * - View submissions by status (pending, approved, rejected)
 * - Approve or reject pending submissions
 * - View detailed information about each submission
 * - Statistics overview of all submissions
 */
export default function AdminPage() {
  // State management for the component
  const [submissions, setSubmissions] = useState(mockSubmissions) // All submissions data
  const [selectedSubmission, setSelectedSubmission] = useState(null) // Currently selected submission for modal
  const [activeTab, setActiveTab] = useState("pending") // Current active tab filter
  const { logout } = useAuth() // Authentication context for logout functionality

  // Handler function to log out the current user
  const handleLogout = () => {
    logout()
  }

  // Handler to approve a submission - updates the status to "approved"
  const handleApprove = (id) => {
    setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status: "approved" } : sub)))
  }

  // Handler to reject a submission - updates the status to "rejected"
  const handleReject = (id) => {
    setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status: "rejected" } : sub)))
  }
  /**
   * Returns the appropriate icon component based on submission status
   * @param {string} status - The status of the submission (pending, approved, rejected)
   * @returns {JSX.Element} The corresponding icon with appropriate styling
   */
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="icon-small icon-yellow" />
      case "approved":
        return <CheckCircle className="icon-small icon-green" />
      case "rejected":
        return <XCircle className="icon-small icon-red" />
      default:
        return null
    }
  }

  /**
   * Returns a styled badge component for the given status
   * @param {string} status - The status to display
   * @returns {JSX.Element} A styled badge with the status text
   */
  const getStatusBadge = (status) => {
    const statusClass = `badge badge-${status}`
    const statusText = status.charAt(0).toUpperCase() + status.slice(1)
    return <span className={statusClass}>{statusText}</span>
  }
  // Filter submissions by status for easier organization
  const pendingSubmissions = submissions.filter((sub) => sub.status === "pending")
  const approvedSubmissions = submissions.filter((sub) => sub.status === "approved")
  const rejectedSubmissions = submissions.filter((sub) => sub.status === "rejected")

  // Count submissions for each status - used in tab labels and statistics
  const tabCounts = {
    pending: pendingSubmissions.length,
    approved: approvedSubmissions.length,
    rejected: rejectedSubmissions.length
  }

  /**
   * Returns the submissions array for the currently active tab
   * @returns {Array} Array of submissions filtered by the active tab status
   */
  const getActiveSubmissions = () => {
    switch (activeTab) {
      case "pending":
        return pendingSubmissions
      case "approved":
        return approvedSubmissions
      case "rejected":
        return rejectedSubmissions
      default:
        return []
    }
  }
  return (
    <div className="admin-page">
      {/* Header Section - Contains branding and navigation */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Left side: App branding and title */}
            <div className="header-branding">
              <FileText className="icon-large" />
              <div>
                <h1 className="header-title">OpenFeedbackVault Admin</h1>
                <p className="header-subtitle">Dataset Submission Management</p>
              </div>
            </div>            
            {/* Right side: Navigation links and logout */}
            <nav className="header-nav">
              <a href="/" className="nav-link">
                Back to Site
              </a>
              <button onClick={handleLogout} className="logout-button">
                <LogOut className="icon-small" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Page Header with title and description */}
        <div className="page-header">
          <h2 className="page-title">Dataset Submissions</h2>
          <p className="page-description">Review and manage dataset submissions from the community.</p>
        </div>        {/* Statistics Cards - Overview of submission counts by status */}
        <div className="stats-grid">
          {/* Pending submissions count */}
          <div className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">Pending Review</h3>
              <Clock className="icon-small icon-yellow" />
            </div>
            <div className="stat-value stat-value-yellow">{pendingSubmissions.length}</div>
          </div>

          {/* Approved submissions count */}
          <div className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">Approved</h3>
              <CheckCircle className="icon-small icon-green" />
            </div>
            <div className="stat-value stat-value-green">{approvedSubmissions.length}</div>
          </div>

          {/* Rejected submissions count */}
          <div className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">Rejected</h3>
              <XCircle className="icon-small icon-red" />
            </div>
            <div className="stat-value stat-value-red">{rejectedSubmissions.length}</div>
          </div>
        </div>        {/* Tab Navigation - Filter submissions by status */}
        <div className="tabs-container">
          <div className="tabs-list">
            {/* Dynamically generate tab buttons for each status */}
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {/* Capitalize first letter and show count in parentheses */}
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tabCounts[tab]})
              </button>
            ))}
          </div>

          {/* Tab Content - Shows submissions based on active tab */}
          <div className="tab-content">
            {/* Render submission cards for the active tab */}
            {getActiveSubmissions().map((submission) => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                onApprove={handleApprove}
                onReject={handleReject}
                onView={setSelectedSubmission} // Opens modal with full details
                showActions={activeTab === "pending"} // Only show approve/reject for pending
                getStatusIcon={getStatusIcon}
              />
            ))}
            {/* Empty state when no submissions match the current filter */}
            {getActiveSubmissions().length === 0 && (
              <div className="empty-state">
                <p>No {activeTab} submissions</p>
              </div>
            )}
          </div>
        </div>        {/* Modal Dialog - Shows detailed view of selected submission */}
        {selectedSubmission && (
          <div className="modal-overlay" onClick={() => setSelectedSubmission(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header with title and close button */}
              <div className="modal-header">
                <div className="modal-title-group">
                  <Database className="icon-medium" />
                  <div>
                    <h2 className="modal-title">Dataset Submission Details</h2>
                    <p className="modal-description">Review the complete submission information</p>
                  </div>
                </div>
                <button className="modal-close" onClick={() => setSelectedSubmission(null)}>
                  <X className="icon-small" />
                </button>
              </div>

              {/* Modal Body with submission details */}
              <div className="modal-body">
                {/* Submission name and status badge */}
                <div className="submission-header">
                  <h3 className="submission-name">{selectedSubmission.datasetName}</h3>
                  {getStatusBadge(selectedSubmission.status)}
                </div>

                {/* Grid layout for submission metadata */}
                <div className="submission-grid">
                  <div className="submission-field">
                    <div className="field-label">
                      <Globe className="icon-extra-small" />
                      Dataset Link
                    </div>
                    <a
                      href={selectedSubmission.datasetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      {selectedSubmission.datasetLink}
                    </a>
                  </div>

                  <div className="submission-field">
                    <div className="field-label">
                      <Calendar className="icon-extra-small" />
                      Date Posted
                    </div>
                    <p>{formatDate(selectedSubmission.datePosted)}</p>
                  </div>

                  <div className="submission-field">
                    <div className="field-label">
                      <Database className="icon-extra-small" />
                      Data Format
                    </div>
                    <p>{selectedSubmission.dataFormat}</p>
                  </div>

                  <div className="submission-field">
                    <div className="field-label">
                      <Hash className="icon-extra-small" />
                      Size & Rows
                    </div>
                    <p>
                      {selectedSubmission.dataSize} MB • {selectedSubmission.numberOfRows} rows
                    </p>
                  </div>

                  <div className="submission-field">
                    <div className="field-label">
                      <Globe className="icon-extra-small" />
                      Language
                    </div>
                    <p>
                      {selectedSubmission.language}
                      {selectedSubmission.otherLanguage && ` (${selectedSubmission.otherLanguage})`}
                    </p>
                  </div>

                  <div className="submission-field">
                    <div className="field-label">
                      <Calendar className="icon-extra-small" />
                      Submitted
                    </div>
                    <p>{formatDate(selectedSubmission.submittedAt)}</p>
                  </div>
                </div>

                <div className="submission-field-full">
                  <div className="field-label">
                    <Tag className="icon-extra-small" />
                    Tags
                  </div>
                  <div className="tags-container">
                    {selectedSubmission.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="submission-field-full">
                  <div className="field-label">Description</div>
                  <p className="description">{selectedSubmission.description}</p>
                </div>

                {selectedSubmission.status === "pending" && (
                  <div className="modal-actions">
                    <button
                      className="btn btn-approve"
                      onClick={() => {
                        handleApprove(selectedSubmission.id)
                        setSelectedSubmission(null)
                      }}
                    >
                      <CheckCircle className="icon-small" />
                      Approve
                    </button>
                    <button
                      className="btn btn-reject"
                      onClick={() => {
                        handleReject(selectedSubmission.id)
                        setSelectedSubmission(null)
                      }}
                    >
                      <XCircle className="icon-small" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

/**
 * SubmissionCard Component
 * Displays a single dataset submission in card format
 * 
 * @param {Object} submission - The submission data to display
 * @param {Function} onApprove - Callback function to approve the submission
 * @param {Function} onReject - Callback function to reject the submission  
 * @param {Function} onView - Callback function to view full submission details
 * @param {boolean} showActions - Whether to show approve/reject buttons (only for pending)
 * @param {Function} getStatusIcon - Function to get the appropriate status icon
 */
function SubmissionCard({ submission, onApprove, onReject, onView, showActions, getStatusIcon }) {
  return (
    <div className="submission-card">
      {/* Card Header - Title, status, and action buttons */}
      <div className="card-header">
        <div className="card-info">
          <h3 className="card-title">{submission.datasetName}</h3>
          <div className="card-meta">
            {getStatusIcon(submission.status)}
            Submitted on {formatDate(submission.submittedAt)}
          </div>
        </div>
        <div className="card-actions">
          {/* View Details button - always visible */}
          <button className="btn btn-outline btn-sm" onClick={() => onView(submission)}>
            <Eye className="icon-small" />
            View Details
          </button>
          {/* Approve/Reject buttons - only shown for pending submissions */}
          {showActions && submission.status === "pending" && onApprove && onReject && (
            <>
              <button className="btn btn-approve btn-sm" onClick={() => onApprove(submission.id)}>
                <CheckCircle className="icon-small" />
                Approve
              </button>
              <button className="btn btn-reject btn-sm" onClick={() => onReject(submission.id)}>
                <XCircle className="icon-small" />
                Reject
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Card Body - Description, tags, and metadata */}
      <div className="card-body">
        {/* Dataset description */}
        <p className="card-description">{submission.description}</p>

        {/* Tags - show first 4, with indicator for more */}
        <div className="tags-container">
          {submission.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag tag-small">
              {tag}
            </span>
          ))}
          {submission.tags.length > 4 && (
            <span className="tag tag-small tag-outline">
              +{submission.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Dataset metadata - format, size, rows, language */}
        <div className="card-metadata">
          <span>{submission.dataFormat}</span>
          <span>•</span>
          <span>{submission.dataSize} MB</span>
          <span>•</span>
          <span>{submission.numberOfRows} rows</span>
          <span>•</span>
          <span>{submission.language}</span>
        </div>
      </div>
    </div>
  )
}