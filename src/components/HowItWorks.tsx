import React from 'react';
import { Search, Database, Shield, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-blue-600" />,
      title: 'Submit URL',
      description: 'Enter any suspicious URL into our secure scanning interface.',
      color: 'border-blue-200 bg-blue-50',
    },
    {
      icon: <Database className="h-12 w-12 text-purple-600" />,
      title: 'Multi-Source Analysis',
      description: 'Our system queries multiple threat databases and performs content analysis.',
      color: 'border-purple-200 bg-purple-50',
    },
    {
      icon: <Shield className="h-12 w-12 text-amber-600" />,
      title: 'AI Processing',
      description: 'Advanced machine learning algorithms evaluate threat patterns and risk factors.',
      color: 'border-amber-200 bg-amber-50',
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-green-600" />,
      title: 'Instant Results',
      description: 'Receive detailed security report with risk assessment and recommendations.',
      color: 'border-green-200 bg-green-50',
    },
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            How Our Detection Works
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Our sophisticated multi-step process ensures accurate threat detection 
            while maintaining lightning-fast response times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`mx-auto w-24 h-24 rounded-full border-4 ${step.color} flex items-center justify-center mb-6`}>
                {step.icon}
              </div>
              <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{step.title}</h3>
              <p className="text-secondary leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Protect Yourself?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join millions of users who trust SecureURL to protect them from phishing attacks and malicious websites.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
            Start Scanning URLs Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;