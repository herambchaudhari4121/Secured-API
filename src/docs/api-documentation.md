# SecureURL API Documentation

## Overview

The SecureURL API provides real-time phishing detection and threat intelligence services. Our RESTful API allows developers to integrate advanced security scanning capabilities into their applications.

**Base URL:** `https://api.secureurl.com/v1`

**API Version:** v1.0.0

**Last Updated:** January 2024

## Authentication

All API requests require authentication using API keys. Include your API key in the request header:

```http
Authorization: Bearer YOUR_API_KEY
```

### Getting an API Key

1. Sign up for a SecureURL account
2. Navigate to the API section in your dashboard
3. Generate a new API key
4. Store your key securely (never expose it in client-side code)

### API Key Types

- **Test Keys:** `sk_test_...` - For development and testing
- **Live Keys:** `sk_live_...` - For production use

## Rate Limits

Rate limits vary by subscription tier:

| Tier | Requests per Hour | Burst Limit |
|------|------------------|-------------|
| Free | 100 | 10/minute |
| Professional | 1,000 | 50/minute |
| Enterprise | 10,000 | 200/minute |

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Error Handling

The API uses conventional HTTP response codes and returns JSON error objects:

### Error Response Format

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The URL parameter is required",
    "details": {
      "parameter": "url",
      "expected": "string",
      "received": "null"
    },
    "request_id": "req_1234567890"
  }
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable - Temporary outage |

### Common Error Codes

| Error Code | Description |
|------------|-------------|
| `invalid_request` | Request parameters are invalid |
| `authentication_failed` | API key is invalid or missing |
| `rate_limit_exceeded` | Too many requests |
| `url_invalid` | Provided URL is malformed |
| `scan_failed` | Unable to complete URL scan |
| `insufficient_credits` | Account has insufficient credits |

## Endpoints

### URL Scanning

#### Scan Single URL

Analyze a single URL for phishing and security threats.

**Endpoint:** `POST /scan`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | The URL to scan (must include protocol) |
| `detailed` | boolean | No | Return detailed analysis (default: false) |
| `callback_url` | string | No | Webhook URL for async results |

**Request Example:**

```bash
curl -X POST https://api.secureurl.com/v1/scan \
  -H "Authorization: Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "detailed": true
  }'
```

**Response Example (200 OK):**

```json
{
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
    "certificates": [
      "SSL Certificate Valid",
      "Extended Validation"
    ]
  }
}
```

**Error Response Example (400 Bad Request):**

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Invalid URL format",
    "details": {
      "parameter": "url",
      "value": "not-a-valid-url"
    },
    "request_id": "req_1234567890"
  }
}
```

#### Bulk URL Scan

Scan multiple URLs simultaneously.

**Endpoint:** `POST /bulk-scan`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urls` | array | Yes | Array of URLs to scan (max 100) |
| `callback_url` | string | No | Webhook URL for results |
| `priority` | string | No | Scan priority: low, normal, high |

**Request Example:**

```bash
curl -X POST https://api.secureurl.com/v1/bulk-scan \
  -H "Authorization: Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc" \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://example1.com",
      "https://example2.com",
      "https://suspicious-site.com"
    ],
    "priority": "high"
  }'
```

**Response Example (202 Accepted):**

```json
{
  "batch_id": "batch_1234567890",
  "status": "processing",
  "total_urls": 3,
  "estimated_completion": "2024-01-15T10:32:00Z",
  "results_url": "/bulk-scan/batch_1234567890/results"
}
```

#### Get Bulk Scan Results

Retrieve results from a bulk scan operation.

**Endpoint:** `GET /bulk-scan/{batch_id}/results`

**Response Example (200 OK):**

```json
{
  "batch_id": "batch_1234567890",
  "status": "completed",
  "total_urls": 3,
  "completed": 3,
  "results": [
    {
      "url": "https://example1.com",
      "status": "safe",
      "risk_score": 0.05
    },
    {
      "url": "https://example2.com",
      "status": "safe",
      "risk_score": 0.08
    },
    {
      "url": "https://suspicious-site.com",
      "status": "dangerous",
      "risk_score": 0.95,
      "threats": ["phishing", "malware"]
    }
  ]
}
```

### Threat Intelligence

#### Get Current Threats

Retrieve current threat intelligence data.

**Endpoint:** `GET /threats`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `severity` | string | No | Filter by severity: low, medium, high, critical |
| `type` | string | No | Filter by threat type: phishing, malware, spam |
| `limit` | integer | No | Number of results (1-100, default: 20) |
| `offset` | integer | No | Pagination offset (default: 0) |

**Request Example:**

```bash
curl -X GET "https://api.secureurl.com/v1/threats?severity=high&limit=10" \
  -H "Authorization: Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc"
```

**Response Example (200 OK):**

```json
{
  "threats": [
    {
      "id": "threat_001",
      "type": "phishing",
      "severity": "high",
      "description": "Banking credential harvesting campaign targeting major financial institutions",
      "indicators": [
        "suspicious-bank-login.com",
        "fake-banking-portal.net"
      ],
      "first_seen": "2024-01-10T08:00:00Z",
      "last_seen": "2024-01-15T14:30:00Z",
      "sources": ["Threat Intelligence Feed", "User Reports"],
      "affected_regions": ["North America", "Europe"]
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 10,
    "offset": 0,
    "has_more": false
  }
}
```

### Account Management

#### Get Account Information

Retrieve account details and usage statistics.

**Endpoint:** `GET /account`

**Response Example (200 OK):**

```json
{
  "account": {
    "id": "acc_1234567890",
    "email": "user@example.com",
    "plan": "professional",
    "status": "active",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "usage": {
    "current_period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z",
      "requests_made": 1250,
      "requests_limit": 50000
    },
    "rate_limits": {
      "requests_per_hour": 1000,
      "burst_limit": 50
    }
  }
}
```

## Webhooks

Configure webhooks to receive real-time notifications about scan results and threat updates.

### Webhook Events

| Event | Description |
|-------|-------------|
| `scan.completed` | Single URL scan completed |
| `bulk_scan.completed` | Bulk scan batch completed |
| `threat.detected` | New threat detected |
| `account.limit_reached` | Usage limit reached |

### Webhook Payload Example

```json
{
  "event": "scan.completed",
  "data": {
    "scan_id": "scan_1234567890",
    "url": "https://example.com",
    "status": "safe",
    "risk_score": 0.12
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## SDKs and Libraries

Official SDKs are available for popular programming languages:

- **JavaScript/Node.js:** `npm install @secureurl/node`
- **Python:** `pip install secureurl-python`
- **PHP:** `composer require secureurl/php`
- **Ruby:** `gem install secureurl`
- **Go:** `go get github.com/secureurl/go`

### JavaScript SDK Example

```javascript
const SecureURL = require('@secureurl/node');

const client = new SecureURL('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

async function scanUrl(url) {
  try {
    const result = await client.scan({
      url: url,
      detailed: true
    });
    console.log('Scan result:', result);
  } catch (error) {
    console.error('Scan failed:', error.message);
  }
}

scanUrl('https://example.com');
```

## Testing

Use our test endpoints to validate your integration:

**Test URLs:**
- Safe: `https://test.secureurl.com/safe`
- Suspicious: `https://test.secureurl.com/suspicious`
- Dangerous: `https://test.secureurl.com/dangerous`

## Support

- **Documentation:** https://docs.secureurl.com
- **Support Email:** heramb.chaudhri@gmail.com
- **Status Page:** https://status.secureurl.com
- **Community Forum:** https://community.secureurl.com

## Changelog

### v1.0.0 (2024-01-15)
- Initial API release
- URL scanning endpoints
- Threat intelligence API
- Account management
- Webhook support