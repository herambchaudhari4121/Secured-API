import React, { useState } from 'react';
import { Search, Upload, Download, AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';
import { APIService } from '../services/api';
import { ScanResult } from '../types';

const URLScanning: React.FC = () => {
  const [singleUrl, setSingleUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');

  const handleSingleScan = async () => {
    if (!singleUrl.trim()) return;
    
    setIsScanning(true);
    try {
      const result = await APIService.scanUrl(singleUrl);
      setScanResults([result]);
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleBulkScan = async () => {
    const urls = bulkUrls.split('\n').filter(url => url.trim());
    if (urls.length === 0) return;

    setIsScanning(true);
    try {
      const results = await APIService.bulkScanUrls(urls);
      setScanResults(results);
    } catch (error) {
      console.error('Bulk scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'suspicious': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'dangerous': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="h-5 w-5" />;
      case 'suspicious': return <AlertTriangle className="h-5 w-5" />;
      case 'dangerous': return <AlertTriangle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const exportResults = () => {
    const csvContent = [
      'URL,Status,Risk Score,SSL Valid,Malware Detected,Timestamp',
      ...scanResults.map(result => 
        `${result.url},${result.status},${result.riskScore.toFixed(2)},${result.analysis.sslValid},${result.analysis.malwareDetected},${result.timestamp}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scan_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-secondary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">URL Security Scanner</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Comprehensive URL analysis to detect phishing, malware, and other security threats
          </p>
        </div>

        <div className="bg-primary rounded-2xl shadow-theme-lg p-8 mb-8 border border-border-primary">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                activeTab === 'single'
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-secondary hover:bg-tertiary'
              }`}
            >
              Single URL Scan
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                activeTab === 'bulk'
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-secondary hover:bg-tertiary'
              }`}
            >
              Bulk URL Scan
            </button>
          </div>

          {activeTab === 'single' ? (
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="url"
                value={singleUrl}
                onChange={(e) => setSingleUrl(e.target.value)}
                placeholder="Enter URL to scan (e.g., https://example.com)"
                className="flex-1 px-6 py-4 text-lg border-2 border-border-primary bg-primary text-primary rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-400/20 transition-all duration-200 outline-none"
              />
              <button
                onClick={handleSingleScan}
                disabled={!singleUrl.trim() || isScanning}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3"
              >
                {isScanning ? (
                  <>
                    <Clock className="h-5 w-5 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Scan URL
                  </>
                )}
              </button>
            </div>
          ) : (
            <div>
              <textarea
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
                placeholder="Enter multiple URLs (one per line)&#10;https://example1.com&#10;https://example2.com&#10;https://example3.com"
                rows={8}
                className="w-full px-6 py-4 text-lg border-2 border-border-primary bg-primary text-primary rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-400/20 transition-all duration-200 outline-none mb-4"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleBulkScan}
                  disabled={!bulkUrls.trim() || isScanning}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3"
                >
                  {isScanning ? (
                    <>
                      <Clock className="h-5 w-5 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      Scan URLs
                    </>
                  )}
                </button>
                {scanResults.length > 0 && (
                  <button
                    onClick={exportResults}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3"
                  >
                    <Download className="h-5 w-5" />
                    Export Results
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {scanResults.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Scan Results</h2>
            {scanResults.map((result) => (
              <div key={result.id} className="bg-primary rounded-2xl shadow-theme-lg p-6 border border-border-primary">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-primary truncate">{result.url}</h3>
                  </div>
                  <div className={`px-4 py-2 rounded-full border-2 ${getStatusColor(result.status)} flex items-center gap-2`}>
                    {getStatusIcon(result.status)}
                    <span className="font-semibold capitalize">{result.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="text-sm text-secondary mb-1">Risk Score</div>
                    <div className="text-2xl font-bold text-primary">{(result.riskScore * 100).toFixed(1)}%</div>
                  </div>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="text-sm text-secondary mb-1">SSL Status</div>
                    <div className={`text-lg font-semibold ${result.analysis.sslValid ? 'text-green-600' : 'text-red-600'}`}>
                      {result.analysis.sslValid ? 'Valid' : 'Invalid'}
                    </div>
                  </div>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="text-sm text-secondary mb-1">Domain Age</div>
                    <div className="text-lg font-semibold text-primary">{result.analysis.domainAge} days</div>
                  </div>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="text-sm text-secondary mb-1">Redirects</div>
                    <div className="text-lg font-semibold text-primary">{result.analysis.redirects}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-3">Analysis Details</h4>
                    <ul className="space-y-2 text-secondary">
                      <li>Reputation: <span className="font-medium">{result.analysis.reputation}</span></li>
                      <li>Content Safe: <span className={`font-medium ${result.analysis.contentSafe ? 'text-green-600' : 'text-red-600'}`}>
                        {result.analysis.contentSafe ? 'Yes' : 'No'}
                      </span></li>
                      <li>Malware Detected: <span className={`font-medium ${result.analysis.malwareDetected ? 'text-red-600' : 'text-green-600'}`}>
                        {result.analysis.malwareDetected ? 'Yes' : 'No'}
                      </span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-3">Technical Details</h4>
                    <ul className="space-y-2 text-secondary">
                      <li>IP Address: <span className="font-medium">{result.details.ipAddress}</span></li>
                      <li>Location: <span className="font-medium">{result.details.location}</span></li>
                      <li>Server: <span className="font-medium">{result.details.serverInfo}</span></li>
                    </ul>
                  </div>
                </div>

                {result.analysis.phishingIndicators.length > 0 && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Phishing Indicators</h4>
                    <ul className="list-disc list-inside text-red-700 dark:text-red-400">
                      {result.analysis.phishingIndicators.map((indicator, index) => (
                        <li key={index}>{indicator}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default URLScanning;