import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'safe' | 'dangerous' | 'suspicious' | null>(null);

  const handleScan = async () => {
    if (!url.trim()) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate API call
    setTimeout(() => {
      const random = Math.random();
      if (random > 0.7) setScanResult('dangerous');
      else if (random > 0.4) setScanResult('suspicious');
      else setScanResult('safe');
      setIsScanning(false);
    }, 2000);
  };

  const getResultColor = () => {
    switch (scanResult) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'suspicious': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'dangerous': return 'text-red-600 bg-red-50 border-red-200';
      default: return '';
    }
  };

  const getResultIcon = () => {
    switch (scanResult) {
      case 'safe': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'suspicious': return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'dangerous': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return null;
    }
  };

  const getResultText = () => {
    switch (scanResult) {
      case 'safe': return 'URL appears to be safe';
      case 'suspicious': return 'URL shows suspicious patterns';
      case 'dangerous': return 'Phishing threat detected!';
      default: return '';
    }
  };

  return (
    <section id="scanner" className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 py-20">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Protect Yourself from
          <span className="text-yellow-300 block">Phishing Attacks</span>
        </h1>
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
          Real-time URL analysis powered by advanced AI and threat intelligence. 
          Scan any website instantly to protect yourself from malicious links and cyber threats.
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="bg-primary rounded-2xl shadow-theme-lg p-8 mb-8 border border-border-primary">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter URL to scan (e.g., https://example.com)"
                  className="w-full px-6 py-4 text-lg border-2 border-border-primary bg-primary text-primary rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-400/20 transition-all duration-200 outline-none"
                />
              </div>
              <button
                onClick={handleScan}
                disabled={!url.trim() || isScanning}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-3"
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

            {scanResult && (
              <div className={`mt-6 p-4 rounded-xl border-2 ${getResultColor()} transition-all duration-300`}>
                <div className="flex items-center justify-center gap-3">
                  {getResultIcon()}
                  <span className="font-semibold text-lg">{getResultText()}</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">99.9%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">5M+</div>
              <div className="text-blue-100">URLs Scanned Daily</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-blue-100">Real-time Protection</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;