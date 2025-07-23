export interface ScanResult {
  id: string;
  url: string;
  status: 'safe' | 'suspicious' | 'dangerous' | 'scanning';
  riskScore: number;
  timestamp: string;
  analysis: {
    reputation: string;
    sslValid: boolean;
    contentSafe: boolean;
    domainAge: number;
    redirects: number;
    malwareDetected: boolean;
    phishingIndicators: string[];
  };
  details: {
    ipAddress: string;
    location: string;
    serverInfo: string;
    certificates: string[];
  };
}

export interface ThreatIntelligence {
  id: string;
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  indicators: string[];
  firstSeen: string;
  lastSeen: string;
  sources: string[];
  affectedRegions: string[];
}

export interface APIEndpoint {
  method: string;
  endpoint: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  example: {
    request: string;
    response: string;
  };
}

export interface EnterpriseFeature {
  name: string;
  description: string;
  benefits: string[];
  pricing: string;
}

export interface ConsultingService {
  name: string;
  description: string;
  duration: string;
  deliverables: string[];
  pricing: string;
}