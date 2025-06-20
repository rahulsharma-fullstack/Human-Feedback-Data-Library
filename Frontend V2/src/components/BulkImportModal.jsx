import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertTriangle, Download } from 'lucide-react';
import { bulkImportService } from '../services/bulkImportService';

export default function BulkImportModal({ isOpen, onClose, onImportComplete }) {
  const [step, setStep] = useState(1); // 1: Upload, 2: Preview, 3: Results
  const [csvData, setCsvData] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [validation, setValidation] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const [importMode, setImportMode] = useState('approved');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvText = e.target.result;
        const csvArray = bulkImportService.csvToArray(csvText);
        const parsed = bulkImportService.parseCsvData(csvArray);
        
        setCsvData(csvArray);
        setParsedData(parsed);
        
        // Validate the data
        const validationResult = await bulkImportService.validateData(parsed);
        setValidation(validationResult.data);
        setStep(2);
      } catch (error) {
        alert('Error processing CSV file: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    try {
      setImporting(true);
      const results = await bulkImportService.importDatasets(parsedData, importMode);
      setImportResults(results.data);
      setStep(3);
      if (onImportComplete) {
        onImportComplete(results.data);
      }
    } catch (error) {
      alert('Error importing datasets: ' + error.message);
    } finally {
      setImporting(false);
    }
  };

  const resetModal = () => {
    setStep(1);
    setCsvData(null);
    setParsedData([]);
    setValidation(null);
    setImporting(false);
    setImportResults(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      ['Team', 'Name', 'Link', 'Name', 'Description', '', 'Tags', 'Data Format', 'Data size (mb)', 'Number of Rows', 'Date posted', 'Language', 'File type', 'Licensing'],
      ['', '', 'https://example.com/dataset1', 'Sample Dataset 1', 'A sample dataset for demonstration', '', 'RLHF, NLG, Sample', 'JSON', '10.5', '1000', '01/01/2024', 'English', 'JSON', 'MIT'],
      ['', '', 'https://example.com/dataset2', 'Sample Dataset 2', 'Another sample dataset', '', 'Educational, QA', 'CSV', '5.2', '500', '15/01/2024', 'English', 'CSV', 'Apache-2.0']
    ];
    
    const csvContent = sampleData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_dataset_import.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bulk Import Datasets
          </h2>
          <div className="mt-4 flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
              <span>Upload CSV</span>
            </div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
              <span>Preview & Validate</span>
            </div>
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
              <span>Import Results</span>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  Upload CSV File
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Upload a CSV file with your dataset information. The first two columns will be ignored.
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  CSV Format Requirements:
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Columns 1-2: Will be ignored (Team, Name)</li>
                  <li>• Column 3: Link (required)</li>
                  <li>• Column 4: Dataset Name (required)</li>
                  <li>• Column 5: Description</li>
                  <li>• Column 7: Tags (comma-separated)</li>
                  <li>• Columns 8-14: Data Format, Size, Rows, Date, Language, File Type, Licensing</li>
                </ul>
                <button
                  onClick={downloadSampleCSV}
                  className="mt-3 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Sample CSV</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && validation && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="ml-2 font-medium text-green-800 dark:text-green-200">
                      Valid: {validation.valid.length}
                    </span>
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="ml-2 font-medium text-red-800 dark:text-red-200">
                      Invalid: {validation.invalid.length}
                    </span>
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="ml-2 font-medium text-yellow-800 dark:text-yellow-200">
                      Warnings: {validation.warnings.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Import Mode:
                  </label>
                  <select
                    value={importMode}
                    onChange={(e) => setImportMode(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="approved">Import as Approved (visible immediately)</option>
                    <option value="pending">Import as Pending (requires admin approval)</option>
                  </select>
                </div>

                {validation.invalid.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                      Invalid Entries:
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {validation.invalid.map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">Row {item.index}: {item.name}</span>
                          <ul className="ml-4 text-red-600 dark:text-red-400">
                            {item.errors.map((error, errorIndex) => (
                              <li key={errorIndex}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Preview (first 5 valid entries):
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {validation.valid.slice(0, 5).map((item, index) => (
                      <div key={index} className="text-sm border border-gray-200 dark:border-gray-600 p-2 rounded">
                        <span className="font-medium">{item.name}</span>
                        {item.warnings.length > 0 && (
                          <div className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">
                            Warnings: {item.warnings.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && importResults && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  Import Complete!
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {importResults.successful.length} of {importResults.total} datasets imported successfully.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                    Successful ({importResults.successful.length})
                  </h4>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {importResults.successful.map((item, index) => (
                      <div key={index} className="text-sm text-green-700 dark:text-green-300">
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>

                {importResults.failed.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                      Failed ({importResults.failed.length})
                    </h4>
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {importResults.failed.map((item, index) => (
                        <div key={index} className="text-sm">
                          <div className="text-red-700 dark:text-red-300 font-medium">
                            {item.dataset}
                          </div>
                          <div className="text-red-600 dark:text-red-400 text-xs">
                            {item.error}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {step === 3 ? 'Close' : 'Cancel'}
          </button>

          <div className="space-x-2">
            {step === 2 && (
              <>
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  onClick={handleImport}
                  disabled={importing || validation.invalid.length > 0}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {importing ? 'Importing...' : `Import ${validation.valid.length} Datasets`}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
