import React, { useState } from 'react';
import { Book, Code, Copy, CheckCircle, ExternalLink, Download } from 'lucide-react';

interface CodeExample {
  language: string;
  code: string;
}

interface Endpoint {
  method: string;
  path: string;
  description: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  examples: {
    request: CodeExample[];
    response: CodeExample;
  };
}

const APIDocumentation: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [copiedCode, setCopiedCode] = useState('');

  const endpoints: Endpoint[] = [
    {
      method: 'POST',
      path: '/v1/scan',
      description: 'Scan a single URL for phishing and security threats',
      parameters: [
        { name: 'url', type: 'string', required: true, description: 'The URL to scan (must include protocol)' },
        { name: 'detailed', type: 'boolean', required: false, description: 'Return detailed analysis (default: false)' },
        { name: 'callback_url', type: 'string', required: false, description: 'Webhook URL for async results' }
      ],
      examples: {
        request: [
          {
            language: 'curl',
            code: `curl -X POST https://api.secureurl.com/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "detailed": true
  }'`
          },
          {
            language: 'javascript',
            code: `const response = await fetch('https://api.secureurl.com/v1/scan', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com',
    detailed: true
  })
});

const result = await response.json();`
          },
          {
            language: 'python',
            code: `import requests

response = requests.post(
    'https://api.secureurl.com/v1/scan',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'url': 'https://example.com',
        'detailed': True
    }
)

result = response.json()`
          }
        ],
        response: {
          language: 'json',
          code: `{
  "id": "scan_1234567890",
  "url": "https://example.com",
  "status": "safe",
  "risk_score": 0.12,
  "scan_time": "2024-01-15T10:30:00Z",
  "analysis": {
    "reputation": "trusted",
    "ssl_valid": true,
    "content_safe": true,
    "domain_age": 3650,
    "redirects": 0,
    "malware_detected": false,
    "phishing_indicators": []
  },
  "details": {
    "ip_address": "93.184.216.34",
    "location": "United States",
    "server_info": "nginx/1.18.0",
    "certificates": ["SSL Certificate Valid"]
  }
}`
        }
      }
    },
    {
      method: 'POST',
      path: '/v1/bulk-scan',
      description: 'Scan multiple URLs simultaneously (max 100 URLs)',
      parameters: [
        { name: 'urls', type: 'array', required: true, description: 'Array of URLs to scan' },
        { name: 'callback_url', type: 'string', required: false, description: 'Webhook URL for results' },
        { name: 'priority', type: 'string', required: false, description: 'Scan priority: low, normal, high' }
      ],
      examples: {
        request: [
          {
            language: 'curl',
            code: `curl -X POST https://api.secureurl.com/v1/bulk-scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "urls": [
      "https://example1.com",
      "https://example2.com"
    ],
    "priority": "high"
  }'`
          }
        ],
        response: {
          language: 'json',
          code: `{
  "batch_id": "batch_1234567890",
  "status": "processing",
  "total_urls": 2,
  "estimated_completion": "2024-01-15T10:32:00Z",
  "results_url": "/bulk-scan/batch_1234567890/results"
}`
        }
      }
    },
    {
      method: 'GET',
      path: '/v1/threats',
      description: 'Get current threat intelligence data',
      parameters: [
        { name: 'severity', type: 'string', required: false, description: 'Filter by severity: low, medium, high, critical' },
        { name: 'type', type: 'string', required: false, description: 'Filter by threat type: phishing, malware, spam' },
        { name: 'limit', type: 'integer', required: false, description: 'Number of results (1-100, default: 20)' },
        { name: 'offset', type: 'integer', required: false, description: 'Pagination offset (default: 0)' }
      ],
      examples: {
        request: [
          {
            language: 'curl',
            code: `curl -X GET "https://api.secureurl.com/v1/threats?severity=high&limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
          }
        ],
        response: {
          language: 'json',
          code: `{
  "threats": [
    {
      "id": "threat_001",
      "type": "phishing",
      "severity": "high",
      "description": "Banking credential harvesting campaign",
      "indicators": ["suspicious-bank.com"],
      "first_seen": "2024-01-10T08:00:00Z",
      "affected_regions": ["North America", "Europe"]
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 10,
    "offset": 0,
    "has_more": false
  }
}`
        }
      }
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const statusCodes = [
    { code: 200, description: 'Success - Request completed successfully' },
    { code: 400, description: 'Bad Request - Invalid parameters or malformed request' },
    { code: 401, description: 'Unauthorized - Invalid or missing API key' },
    { code: 403, description: 'Forbidden - Insufficient permissions for this resource' },
    { code: 404, description: 'Not Found - The requested resource does not exist' },
    { code: 429, description: 'Too Many Requests - Rate limit exceeded' },
    { code: 500, description: 'Internal Server Error - Something went wrong on our end' },
    { code: 503, description: 'Service Unavailable - Temporary service outage' }
  ];

  const errorCodes = [
    { code: 'invalid_request', description: 'Request parameters are invalid or missing' },
    { code: 'authentication_failed', description: 'API key is invalid, expired, or missing' },
    { code: 'rate_limit_exceeded', description: 'Too many requests sent in a given time period' },
    { code: 'url_invalid', description: 'The provided URL is malformed or unreachable' },
    { code: 'scan_failed', description: 'Unable to complete the security scan' },
    { code: 'insufficient_credits', description: 'Account has insufficient credits for this operation' }
  ];

  return (
    <div className="min-h-screen bg-secondary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">API Documentation</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Complete reference for integrating SecureURL's phishing detection API into your applications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
              <Download className="h-5 w-5" />
              Download OpenAPI Spec
            </button>
            <button className="border-2 border-border-primary hover:border-border-hover text-secondary px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Interactive API Explorer
            </button>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-primary rounded-2xl shadow-theme-lg p-8 mb-8 border border-border-primary">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <Book className="h-8 w-8 text-blue-600 mr-3" />
            Quick Start Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary rounded-lg p-6">
              <div className="bg-blue-100 dark:bg-blue-950/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Get API Key</h3>
              <p className="text-secondary text-sm">Sign up and generate your API key from the dashboard</p>
            </div>
            <div className="bg-secondary rounded-lg p-6">
              <div className="bg-green-100 dark:bg-green-950/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Make Request</h3>
              <p className="text-secondary text-sm">Send authenticated requests to our API endpoints</p>
            </div>
            <div className="bg-secondary rounded-lg p-6">
              <div className="bg-purple-100 dark:bg-purple-950/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Handle Response</h3>
              <p className="text-secondary text-sm">Process the JSON response and integrate results</p>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-primary rounded-2xl shadow-theme-lg p-8 mb-8 border border-border-primary">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <Code className="h-8 w-8 text-purple-600 mr-3" />
            API Endpoints
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Endpoint List */}
            <div className="space-y-2">
              {endpoints.map((endpoint, index) => (
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
                    <span className="font-mono text-sm">{endpoint.path}</span>
                  </div>
                  <p className="text-sm text-secondary">{endpoint.description}</p>
                </button>
              ))}
            </div>

            {/* Endpoint Details */}
            <div className="lg:col-span-2">
              {endpoints[selectedEndpoint] && (
                <div className="space-y-6">
                  {/* Parameters */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Parameters</h3>
                    <div className="space-y-3">
                      {endpoints[selectedEndpoint].parameters.map((param, index) => (
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

                  {/* Request Examples */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Request Examples</h3>
                    <div className="space-y-4">
                      {endpoints[selectedEndpoint].examples.request.map((example, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-secondary capitalize">{example.language}</span>
                            <button
                              onClick={() => copyToClipboard(example.code, `request-${index}`)}
                              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors duration-200 flex items-center gap-2"
                            >
                              {copiedCode === `request-${index}` ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              {copiedCode === `request-${index}` ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-green-400 text-sm">{example.code}</pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Response Example */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-primary">Response Example</h3>
                      <button
                        onClick={() => copyToClipboard(endpoints[selectedEndpoint].examples.response.code, 'response')}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors duration-200 flex items-center gap-2"
                      >
                        {copiedCode === 'response' ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copiedCode === 'response' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-blue-400 text-sm">{endpoints[selectedEndpoint].examples.response.code}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Codes & Error Handling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-primary rounded-2xl shadow-theme-lg p-8 border border-border-primary">
            <h3 className="text-xl font-bold text-primary mb-6">HTTP Status Codes</h3>
            <div className="space-y-3">
              {statusCodes.map((status, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    status.code < 300 ? 'bg-green-100 text-green-800' :
                    status.code < 400 ? 'bg-blue-100 text-blue-800' :
                    status.code < 500 ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {status.code}
                  </span>
                  <p className="text-sm text-secondary">{status.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary rounded-2xl shadow-theme-lg p-8 border border-border-primary">
            <h3 className="text-xl font-bold text-primary mb-6">Error Codes</h3>
            <div className="space-y-3">
              {errorCodes.map((error, index) => (
                <div key={index} className="p-3 bg-secondary rounded-lg">
                  <div className="font-mono text-sm font-semibold text-primary mb-1">{error.code}</div>
                  <p className="text-sm text-secondary">{error.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-primary rounded-2xl shadow-theme-lg p-8 mb-8 border border-border-primary">
          <h2 className="text-2xl font-bold text-primary mb-6">Authentication</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">API Key Authentication</h3>
              <p className="text-secondary mb-4">
                All API requests require authentication using Bearer tokens. Include your API key in the Authorization header:
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm">Authorization: Bearer YOUR_API_KEY</pre>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Rate Limits</h3>
              <div className="space-y-3">
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
          </div>
        </div>

        {/* SDKs */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Official SDKs</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get started quickly with our official SDKs for popular programming languages
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['JavaScript', 'Python', 'PHP', 'Ruby', 'Go'].map((lang) => (
              <button
                key={lang}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;