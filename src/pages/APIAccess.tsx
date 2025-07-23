import React, { useState, useEffect } from 'react';
import { Code, Key, Copy, CheckCircle, BarChart3, Clock } from 'lucide-react';
import { APIService } from '../services/api';
import { APIEndpoint } from '../types';
import APIDocumentation from '../components/APIDocumentation';

const APIAccess: React.FC = () => {
  const [apiKey, setApiKey] = useState('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState('');
  const [usageStats, setUsageStats] = useState<any>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'documentation'>('overview');

  useEffect(() => {
    loadUsageStats();
  }, []);

  const loadUsageStats = async () => {
    try {
      const stats = await APIService.getApiUsageStats();
      setUsageStats(stats);
    } catch (error) {
      console.error('Failed to load usage stats:', error);
    }
  };

  const apiEndpoints: APIEndpoint[] = [
    {
      method: 'POST',
      endpoint: '/v1/scan',
      description: 'Scan a single URL for threats',
      parameters: [
        { name: 'url', type: 'string', required: true, description: 'The URL to scan' },
        { name: 'detailed', type: 'boolean', required: false, description: 'Return detailed analysis' }
      ],
      example: {
        request: `curl -X POST https://api.secureurl.com/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "detailed": true
  }'`,
        response: `{
  "status": "safe",
  "risk_score": 0.12,
  "analysis": {
    "reputation": "trusted",
    "ssl_valid": true,
    "content_safe": true,
    "domain_age": 3650,
    "redirects": 0
  },
  "scan_time": "2024-01-15T10:30:00Z"
}`
      }
    },
    {
      method: 'POST',
      endpoint: '/v1/bulk-scan',
      description: 'Scan multiple URLs simultaneously',
      parameters: [
        { name: 'urls', type: 'array', required: true, description: 'Array of URLs to scan' },
        { name: 'callback_url', type: 'string', required: false, description: 'Webhook URL for results' }
      ],
      example: {
        request: `curl -X POST https://api.secureurl.com/v1/bulk-scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "urls": [
      "https://example1.com",
      "https://example2.com"
    ]
  }'`,
        response: `{
  "batch_id": "batch_123456",
  "status": "processing",
  "total_urls": 2,
  "estimated_completion": "2024-01-15T10:32:00Z"
}`
      }
    },
    {
      method: 'GET',
      endpoint: '/v1/threats',
      description: 'Get current threat intelligence',
      parameters: [
        { name: 'severity', type: 'string', required: false, description: 'Filter by severity (low, medium, high, critical)' },
        { name: 'limit', type: 'number', required: false, description: 'Number of results to return (max 100)' }
      ],
      example: {
        request: `curl -X GET "https://api.secureurl.com/v1/threats?severity=high&limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
        response: `{
  "threats": [
    {
      "id": "threat_001",
      "type": "phishing",
      "severity": "high",
      "description": "Banking credential harvesting campaign",
      "indicators": ["suspicious-bank.com"],
      "first_seen": "2024-01-10T08:00:00Z"
    }
  ],
  "total": 1,
  "page": 1
}`
      }
    }
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'key') {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedCode(type);
      setTimeout(() => setCopiedCode(''), 2000);
    }
  };

  const generateApiKey = () => {
    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
  };

  return (
    <div className="min-h-screen bg-secondary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">API Access & Documentation</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Integrate powerful phishing detection into your applications with our comprehensive REST API
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-secondary text-secondary hover:bg-tertiary'
            }`}
          >
            API Overview
          </button>
          <button
            onClick={() => setActiveTab('documentation')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeTab === 'documentation'
                ? 'bg-blue-600 text-white'
                : 'bg-secondary text-secondary hover:bg-tertiary'
            }`}
          >
            Full Documentation
          </button>
        </div>

        {activeTab === 'documentation' ? (
          <APIDocumentation />
        ) : (
          <>
        {/* API Key Management */}
        <div className="bg-primary rounded-2xl shadow-theme-lg p-8 mb-8 border border-border-primary">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <Key className="h-8 w-8 text-blue-600 mr-3" />
            API Key Management
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Your API Key</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={apiKey}
                  readOnly
                  className="flex-1 px-4 py-3 bg-secondary border-2 border-border-primary rounded-lg font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(apiKey, 'key')}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  {copiedKey ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedKey ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <button
                onClick={generateApiKey}
                className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                Generate New Key
              </button>
            </div>

            {usageStats && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary rounded-lg p-4">
                  <div className="text-sm text-secondary mb-1">Total Requests</div>
                  <div className="text-2xl font-bold text-primary">{usageStats.totalRequests.toLocaleString()}</div>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <div className="text-sm text-secondary mb-1">Today</div>
                  <div className="text-2xl font-bold text-primary">{usageStats.requestsToday.toLocaleString()}</div>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <div className="text-sm text-secondary mb-1">Avg Response</div>
                  <div className="text-2xl font-bold text-primary">{usageStats.averageResponseTime}ms</div>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <div className="text-sm text-secondary mb-1">Uptime</div>
                  <div className="text-2xl font-bold text-green-600">{usageStats.uptime}%</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-primary rounded-2xl shadow-theme-lg p-8 mb-8 border border-border-primary">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <Code className="h-8 w-8 text-purple-600 mr-3" />
            API Endpoints
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              {apiEndpoints.map((endpoint, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedEndpoint(index)}
                  className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                    selectedEndpoint === index
                      ? 'bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800'
                      : 'bg-secondary hover:bg-tertiary border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="font-mono text-sm">{endpoint.endpoint}</span>
                  </div>
                  <p className="text-sm text-secondary">{endpoint.description}</p>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {apiEndpoints[selectedEndpoint] && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Parameters</h3>
                    <div className="space-y-3">
                      {apiEndpoints[selectedEndpoint].parameters.map((param, index) => (
                        <div key={index} className="bg-secondary rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-sm font-semibold text-primary">{param.name}</span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{param.type}</span>
                            {param.required && (
                              <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 px-2 py-1 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-secondary">{param.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-primary">Example Request</h3>
                      <button
                        onClick={() => copyToClipboard(apiEndpoints[selectedEndpoint].example.request, 'request')}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors duration-200 flex items-center gap-2"
                      >
                        {copiedCode === 'request' ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copiedCode === 'request' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">{apiEndpoints[selectedEndpoint].example.request}</pre>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-primary">Example Response</h3>
                      <button
                        onClick={() => copyToClipboard(apiEndpoints[selectedEndpoint].example.response, 'response')}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors duration-200 flex items-center gap-2"
                      >
                        {copiedCode === 'response' ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copiedCode === 'response' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-blue-400 text-sm">{apiEndpoints[selectedEndpoint].example.response}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rate Limits & Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary rounded-2xl shadow-theme-lg p-8 border border-border-primary">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <Clock className="h-6 w-6 text-amber-600 mr-3" />
              Rate Limits
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border-primary">
                <span className="text-secondary">Free Tier</span>
                <span className="font-semibold text-primary">100 requests/hour</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border-primary">
                <span className="text-secondary">Professional</span>
                <span className="font-semibold text-primary">1,000 requests/hour</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-secondary">Enterprise</span>
                <span className="font-semibold text-primary">Custom limits</span>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-2xl shadow-theme-lg p-8 border border-border-primary">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <BarChart3 className="h-6 w-6 text-green-600 mr-3" />
              Response Codes
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border-primary">
                <span className="text-secondary">200 - Success</span>
                <span className="text-green-600 font-semibold">Request completed</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border-primary">
                <span className="text-secondary">400 - Bad Request</span>
                <span className="text-red-600 font-semibold">Invalid parameters</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border-primary">
                <span className="text-secondary">401 - Unauthorized</span>
                <span className="text-red-600 font-semibold">Invalid API key</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-secondary">429 - Rate Limited</span>
                <span className="text-amber-600 font-semibold">Too many requests</span>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default APIAccess;