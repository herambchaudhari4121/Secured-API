import React from 'react';
import { Code, Key, Zap, Globe } from 'lucide-react';

const API: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: 'High Performance',
      description: 'Process up to 10,000 requests per minute',
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      title: 'Global CDN',
      description: 'Low latency endpoints worldwide',
    },
    {
      icon: <Key className="h-6 w-6 text-green-500" />,
      title: 'Simple Authentication',
      description: 'Easy API key management',
    },
    {
      icon: <Code className="h-6 w-6 text-purple-500" />,
      title: 'Developer Friendly',
      description: 'RESTful API with comprehensive docs',
    },
  ];

  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      requests: '1,000 requests/month',
      features: ['Basic threat detection', 'Email support', 'Standard rate limits'],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29',
      requests: '50,000 requests/month',
      features: ['Advanced AI detection', 'Priority support', 'Higher rate limits', 'Detailed analytics'],
      buttonText: 'Choose Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      requests: 'Unlimited requests',
      features: ['Custom integration', '24/7 phone support', 'SLA guarantee', 'On-premise deployment'],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="api" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Developer API
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Integrate powerful phishing detection into your applications with our robust, 
            scalable API designed for developers and enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-primary rounded-xl p-6 text-center shadow-theme-lg border border-border-primary">
              <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-secondary text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Quick Start Example</h3>
          <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`curl -X POST https://api.secureurl.com/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "detailed": true
  }'

# Response
{
  "status": "safe",
  "risk_score": 0.12,
  "analysis": {
    "reputation": "trusted",
    "ssl_valid": true,
    "content_safe": true
  },
  "scan_time": "2024-01-15T10:30:00Z"
}`}
            </pre>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-primary rounded-2xl shadow-theme-lg p-8 relative border border-border-primary ${
                tier.popular ? 'ring-4 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {tier.price}
                  {tier.price !== 'Custom' && <span className="text-lg text-secondary">/month</span>}
                </div>
                <p className="text-secondary">{tier.requests}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-secondary">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                  tier.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-secondary hover:bg-tertiary text-primary'
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-secondary mb-6">
            Need help getting started? Our documentation and support team are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              View Documentation
            </button>
            <button className="border-2 border-border-primary hover:border-border-hover text-secondary px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default API;