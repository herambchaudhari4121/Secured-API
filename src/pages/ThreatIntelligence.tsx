import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Globe, Clock, Filter, Search } from 'lucide-react';
import { APIService } from '../services/api';
import { ThreatIntelligence } from '../types';

const ThreatIntelligencePage: React.FC = () => {
  const [threats, setThreats] = useState<ThreatIntelligence[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    loadThreatData();
  }, []);

  const loadThreatData = async () => {
    try {
      const data = await APIService.getThreatIntelligence();
      setThreats(data);
    } catch (error) {
      console.error('Failed to load threat intelligence:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.threatType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || threat.severity === severityFilter;
    const matchesType = typeFilter === 'all' || threat.threatType.toLowerCase().includes(typeFilter.toLowerCase());
    
    return matchesSearch && matchesSeverity && matchesType;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const threatStats = {
    total: threats.length,
    critical: threats.filter(t => t.severity === 'critical').length,
    high: threats.filter(t => t.severity === 'high').length,
    active: threats.filter(t => {
      const lastSeen = new Date(t.lastSeen);
      const now = new Date();
      const diffHours = (now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60);
      return diffHours < 24;
    }).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary pt-20 flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-secondary">Loading threat intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Threat Intelligence Dashboard</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Real-time threat intelligence and security insights from our global monitoring network
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-primary rounded-xl p-6 shadow-theme border border-border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary text-sm">Total Threats</p>
                <p className="text-3xl font-bold text-primary">{threatStats.total}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-primary rounded-xl p-6 shadow-theme border border-border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary text-sm">Critical Threats</p>
                <p className="text-3xl font-bold text-red-600">{threatStats.critical}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-primary rounded-xl p-6 shadow-theme border border-border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary text-sm">High Priority</p>
                <p className="text-3xl font-bold text-orange-600">{threatStats.high}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-primary rounded-xl p-6 shadow-theme border border-border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary text-sm">Active (24h)</p>
                <p className="text-3xl font-bold text-green-600">{threatStats.active}</p>
              </div>
              <Globe className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-primary rounded-xl p-6 shadow-theme mb-8 border border-border-primary">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
                <input
                  type="text"
                  placeholder="Search threats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-border-primary bg-primary text-primary rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-400/20 transition-all duration-200 outline-none"
                />
              </div>
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-4 py-3 border-2 border-border-primary bg-primary text-primary rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-400/20 transition-all duration-200 outline-none"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border-2 border-border-primary bg-primary text-primary rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-400/20 transition-all duration-200 outline-none"
            >
              <option value="all">All Types</option>
              <option value="phishing">Phishing</option>
              <option value="malware">Malware</option>
              <option value="spam">Spam</option>
            </select>
          </div>
        </div>

        {/* Threat List */}
        <div className="space-y-6">
          {filteredThreats.map((threat) => (
            <div key={threat.id} className="bg-primary rounded-xl shadow-theme-lg p-6 border border-border-primary">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-primary">{threat.threatType}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-secondary mb-4">{threat.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm text-secondary mb-1">First Seen</p>
                  <p className="font-semibold text-primary">{new Date(threat.firstSeen).toLocaleDateString()}</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm text-secondary mb-1">Last Seen</p>
                  <p className="font-semibold text-primary">{new Date(threat.lastSeen).toLocaleDateString()}</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm text-secondary mb-1">Sources</p>
                  <p className="font-semibold text-primary">{threat.sources.length}</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm text-secondary mb-1">Affected Regions</p>
                  <p className="font-semibold text-primary">{threat.affectedRegions.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Threat Indicators</h4>
                  <div className="space-y-1">
                    {threat.indicators.map((indicator, index) => (
                      <div key={index} className="bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 px-3 py-1 rounded text-sm font-mono">
                        {indicator}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Affected Regions</h4>
                  <div className="flex flex-wrap gap-2">
                    {threat.affectedRegions.map((region, index) => (
                      <span key={index} className="bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300 px-3 py-1 rounded text-sm">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredThreats.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">No threats found</h3>
            <p className="text-secondary">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatIntelligencePage;