import React from 'react';
import { TrendingUp, Users, Globe, Shield } from 'lucide-react';

const Statistics: React.FC = () => {
  const stats = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      value: '2.5M+',
      label: 'Threats Blocked',
      description: 'Malicious URLs detected and blocked this month',
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      value: '500K+',
      label: 'Active Users',
      description: 'Security-conscious users protecting themselves daily',
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      value: '99.97%',
      label: 'Uptime',
      description: 'Reliable service availability around the clock',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-amber-600" />,
      value: '15M+',
      label: 'URLs Scanned',
      description: 'Total security scans performed to date',
    },
  ];

  return (
    <section className="py-20 bg-gray-900 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Security Professionals
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time statistics showcasing our commitment to cybersecurity excellence 
            and the trust of our global user community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 dark:bg-gray-700 rounded-2xl p-8 text-center hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300">
              <div className="bg-gray-700 dark:bg-gray-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-xl font-semibold text-gray-300 mb-3">{stat.label}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-gray-800 dark:bg-gray-700 rounded-2xl px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-medium">System Status: Operational</span>
            </div>
            <div className="text-gray-400">|</div>
            <div className="text-gray-300 font-medium">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;