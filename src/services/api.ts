import { ScanResult, ThreatIntelligence } from '../types';

// Simulated API service - replace with actual backend calls
export class APIService {
  private static baseUrl = 'https://api.secureurl.com/v1';

  static async scanUrl(url: string): Promise<ScanResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate different scan results
    const random = Math.random();
    const riskScore = Math.random();
    
    let status: 'safe' | 'suspicious' | 'dangerous';
    if (riskScore < 0.3) status = 'safe';
    else if (riskScore < 0.7) status = 'suspicious';
    else status = 'dangerous';

    const mockResult: ScanResult = {
      id: `scan_${Date.now()}`,
      url,
      status,
      riskScore,
      timestamp: new Date().toISOString(),
      analysis: {
        reputation: status === 'safe' ? 'trusted' : status === 'suspicious' ? 'unknown' : 'malicious',
        sslValid: random > 0.2,
        contentSafe: status !== 'dangerous',
        domainAge: Math.floor(Math.random() * 3650),
        redirects: Math.floor(Math.random() * 5),
        malwareDetected: status === 'dangerous' && random > 0.5,
        phishingIndicators: status === 'dangerous' ? ['Suspicious domain', 'Fake login form'] : []
      },
      details: {
        ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        location: 'United States',
        serverInfo: 'nginx/1.18.0',
        certificates: ['SSL Certificate Valid', 'Extended Validation']
      }
    };

    return mockResult;
  }

  static async bulkScanUrls(urls: string[]): Promise<ScanResult[]> {
    const results = await Promise.all(urls.map(url => this.scanUrl(url)));
    return results;
  }

  static async getThreatIntelligence(): Promise<ThreatIntelligence[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockThreats: ThreatIntelligence[] = [
      {
        id: 'threat_001',
        threatType: 'Phishing Campaign',
        severity: 'high',
        description: 'Banking credential harvesting campaign targeting major financial institutions',
        indicators: ['suspicious-bank-login.com', 'fake-banking-portal.net'],
        firstSeen: '2024-01-10T08:00:00Z',
        lastSeen: '2024-01-15T14:30:00Z',
        sources: ['Threat Intelligence Feed', 'User Reports'],
        affectedRegions: ['North America', 'Europe']
      },
      {
        id: 'threat_002',
        threatType: 'Malware Distribution',
        severity: 'critical',
        description: 'Trojan malware being distributed through fake software download sites',
        indicators: ['free-software-download.org', 'cracked-apps-here.com'],
        firstSeen: '2024-01-12T10:15:00Z',
        lastSeen: '2024-01-15T16:45:00Z',
        sources: ['Malware Analysis', 'Honeypot Network'],
        affectedRegions: ['Global']
      }
    ];

    return mockThreats;
  }

  static async getApiUsageStats() {
    return {
      totalRequests: 1250000,
      requestsToday: 45000,
      averageResponseTime: 180,
      uptime: 99.97
    };
  }
}