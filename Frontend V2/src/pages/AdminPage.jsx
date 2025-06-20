import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Eye, FileText, Calendar, Database, Tag, Globe, Hash, X } from 'lucide-react';
import { datasetService } from '../services/datasetService';

// Simple date formatter utility function
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export default function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate();

  // Load data on component mount
  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get pending submissions
      const pendingResponse = await datasetService.getPendingSubmissions();
      
      // Get all datasets to see approved/rejected ones
      const allDatasetsResponse = await datasetService.getDatasets({ limit: 1000 });
      
      // Combine submissions with different statuses
      const pendingSubmissions = pendingResponse.data || [];
      const approvedDatasets = allDatasetsResponse.data || [];
      
      // Format the data to match the expected structure
      const formattedSubmissions = [
        ...pendingSubmissions.map(sub => ({
          ...sub,
          tags: sub.tags || [],
          datePosted: new Date(sub.created_at),
          submittedAt: new Date(sub.created_at),
        })),
        ...approvedDatasets.map(dataset => ({
          ...dataset,
          tags: dataset.tags || [],
          datePosted: new Date(dataset.created_at),
          submittedAt: new Date(dataset.created_at),
        }))
      ];
      
      setSubmissions(formattedSubmissions);
    } catch (err) {
      setError('Failed to load submissions: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await datasetService.approveSubmission(id);
      await loadSubmissions(); // Reload data
    } catch (err) {
      alert('Failed to approve submission: ' + (err.message || 'Unknown error'));
    }
  };

  const handleReject = async (id) => {
    try {
      const reason = prompt('Please provide a reason for rejection (optional):');
      await datasetService.rejectSubmission(id, reason || '');
      await loadSubmissions(); // Reload data
    } catch (err) {
      alert('Failed to reject submission: ' + (err.message || 'Unknown error'));
    }  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {statusText}
      </span>
    );
  };

  // Filter submissions by status
  const pendingSubmissions = submissions.filter((sub) => sub.status === "pending");
  const approvedSubmissions = submissions.filter((sub) => sub.status === "approved");
  const rejectedSubmissions = submissions.filter((sub) => sub.status === "rejected");

  const tabCounts = {
    pending: pendingSubmissions.length,
    approved: approvedSubmissions.length,
    rejected: rejectedSubmissions.length
  };
  const getActiveSubmissions = () => {
    switch (activeTab) {
      case "pending":
        return pendingSubmissions;
      case "approved":
        return approvedSubmissions;
      case "rejected":
        return rejectedSubmissions;
      default:
        return [];
    }
  };
  // Don't render anything while loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Data</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={loadSubmissions}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dataset Submission Management</p>
              </div>
            </div>            <nav className="flex items-center space-x-4">
              <a href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Back to Site
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dataset Submissions</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Review and manage dataset submissions from the community.</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Pending Review
                    </dt>
                    <dd className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                      {pendingSubmissions.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Approved
                    </dt>
                    <dd className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {approvedSubmissions.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Rejected
                    </dt>
                    <dd className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {rejectedSubmissions.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex">
              {["pending", "approved", "rejected"].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  } transition-colors`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tabCounts[tab]})
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {getActiveSubmissions().length === 0 ? (
              <div className="text-center py-12">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No {activeTab} submissions</p>
              </div>
            ) : (
              <div className="space-y-6">
                {getActiveSubmissions().map((submission) => (
                  <SubmissionCard
                    key={submission.id}
                    submission={submission}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onView={setSelectedSubmission}
                    showActions={activeTab === "pending"}
                    getStatusIcon={getStatusIcon}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setSelectedSubmission(null)}>
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <Database className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Dataset Submission Details</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Review the complete submission information</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onClick={() => setSelectedSubmission(null)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedSubmission.datasetName}</h4>
                  {getStatusBadge(selectedSubmission.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <Globe className="w-4 h-4 mr-1" />
                      Dataset Link
                    </div>
                    <a
                      href={selectedSubmission.datasetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
                    >
                      {selectedSubmission.datasetLink}
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Date Posted
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">{formatDate(selectedSubmission.datePosted)}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <Database className="w-4 h-4 mr-1" />
                      Data Format
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedSubmission.dataFormat}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <Hash className="w-4 h-4 mr-1" />
                      Size & Rows
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedSubmission.dataSize} MB • {selectedSubmission.numberOfRows} rows
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <Globe className="w-4 h-4 mr-1" />
                      Language
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedSubmission.language}
                      {selectedSubmission.otherLanguage && ` (${selectedSubmission.otherLanguage})`}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Submitted
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">{formatDate(selectedSubmission.submittedAt)}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Tag className="w-4 h-4 mr-1" />
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubmission.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Description</div>
                  <p className="text-sm text-gray-900 dark:text-white leading-relaxed">{selectedSubmission.description}</p>
                </div>

                {selectedSubmission.status === "pending" && (
                  <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      onClick={() => {
                        handleApprove(selectedSubmission.id);
                        setSelectedSubmission(null);
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      onClick={() => {
                        handleReject(selectedSubmission.id);
                        setSelectedSubmission(null);
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
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
  );
}

// SubmissionCard Component
function SubmissionCard({ submission, onApprove, onReject, onView, showActions, getStatusIcon }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{submission.datasetName}</h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            {getStatusIcon(submission.status)}
            <span className="ml-2">Submitted on {formatDate(submission.submittedAt)}</span>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button 
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            onClick={() => onView(submission)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </button>
          {showActions && submission.status === "pending" && onApprove && onReject && (
            <>
              <button 
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                onClick={() => onApprove(submission.id)}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </button>
              <button 
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                onClick={() => onReject(submission.id)}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </button>
            </>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{submission.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {submission.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {tag}
          </span>
        ))}
        {submission.tags.length > 4 && (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            +{submission.tags.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
        <span>{submission.dataFormat}</span>
        <span>•</span>
        <span>{submission.dataSize} MB</span>
        <span>•</span>
        <span>{submission.numberOfRows} rows</span>
        <span>•</span>
        <span>{submission.language}</span>
      </div>
    </div>
  );
}
