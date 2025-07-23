import React from 'react';
import { Shield, Zap, Globe, Brain, Users, Lock } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: 'Lightning Fast Scanning',
      description: 'Get results in under 2 seconds with our optimized detection algorithms and global infrastructure.',
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning models trained on millions of URLs to identify even the newest threats.',
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: 'Global Threat Intelligence',
      description: 'Real-time data from security partners worldwide keeps our detection database constantly updated.',
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: 'Multi-Layer Security',
      description: 'Comprehensive analysis including domain reputation, SSL certificates, and content inspection.',
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: 'Bulk URL Processing',
      description: 'Scan multiple URLs simultaneously with our enterprise-grade batch processing system.',
    },
    {
      icon: <Lock className="h-8 w-8 text-amber-600" />,
      title: 'Privacy First',
      description: 'All scans are encrypted and anonymized. We never store your personal data or browsing history.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Advanced Protection Features
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Our comprehensive security platform combines cutting-edge technology with real-time threat intelligence 
            to keep you safe from evolving cyber threats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-primary rounded-2xl p-8 shadow-theme hover:shadow-theme-lg transition-all duration-300 transform hover:scale-105 border border-border-primary"
            >
              <div className="flex items-center mb-4">
                <div className="bg-secondary rounded-lg p-3 mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
              </div>
              <p className="text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;