import React from 'react';
import { Building2, Shield, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { EnterpriseFeature } from '../types';

const EnterpriseSolutions: React.FC = () => {
  const enterpriseFeatures: EnterpriseFeature[] = [
    {
      name: 'Custom Integration',
      description: 'Seamless integration with your existing security infrastructure and workflows',
      benefits: [
        'Custom API endpoints tailored to your needs',
        'White-label solution with your branding',
        'Integration with SIEM and security tools',
        'Custom reporting and analytics dashboards'
      ],
      pricing: 'Starting at $5,000/month'
    },
    {
      name: 'On-Premise Deployment',
      description: 'Deploy SecureURL within your own infrastructure for maximum control and compliance',
      benefits: [
        'Complete data sovereignty and privacy',
        'Air-gapped deployment options',
        'Custom security policies and configurations',
        'Dedicated support and maintenance'
      ],
      pricing: 'Starting at $50,000/year'
    },
    {
      name: 'Advanced Threat Intelligence',
      description: 'Enhanced threat detection with custom intelligence feeds and machine learning models',
      benefits: [
        'Industry-specific threat intelligence',
        'Custom machine learning model training',
        'Real-time threat feed integration',
        'Advanced behavioral analysis'
      ],
      pricing: 'Starting at $10,000/month'
    },
    {
      name: 'Dedicated Support',
      description: '24/7 premium support with dedicated security experts and account management',
      benefits: [
        '24/7 phone and email support',
        'Dedicated customer success manager',
        'Priority incident response (< 1 hour)',
        'Regular security briefings and updates'
      ],
      pricing: 'Included with Enterprise plans'
    }
  ];

  const useCases = [
    {
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
      title: 'Financial Services',
      description: 'Protect customers from banking phishing attacks and financial fraud',
      features: ['Regulatory compliance (PCI DSS, SOX)', 'Real-time transaction monitoring', 'Customer protection alerts']
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: 'Healthcare',
      description: 'Secure patient data and prevent healthcare-targeted phishing campaigns',
      features: ['HIPAA compliance', 'Medical record protection', 'Staff security training']
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Government',
      description: 'Protect sensitive government systems and citizen data from cyber threats',
      features: ['FedRAMP compliance', 'Classified data protection', 'Multi-level security clearance']
    },
    {
      icon: <Zap className="h-8 w-8 text-amber-600" />,
      title: 'Technology',
      description: 'Safeguard intellectual property and prevent corporate espionage',
      features: ['Source code protection', 'Employee security awareness', 'Supply chain security']
    }
  ];

  const deploymentOptions = [
    {
      name: 'Cloud-Based',
      description: 'Fully managed cloud solution with global availability',
      features: ['99.99% uptime SLA', 'Global CDN', 'Auto-scaling', 'Managed updates'],
      bestFor: 'Organizations wanting quick deployment with minimal maintenance'
    },
    {
      name: 'Hybrid',
      description: 'Combination of cloud and on-premise components',
      features: ['Flexible data residency', 'Custom integrations', 'Gradual migration', 'Cost optimization'],
      bestFor: 'Organizations with specific compliance or integration requirements'
    },
    {
      name: 'On-Premise',
      description: 'Complete control with on-site deployment',
      features: ['Full data control', 'Custom configurations', 'Air-gapped options', 'Dedicated hardware'],
      bestFor: 'Organizations with strict security or regulatory requirements'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">Enterprise Security Solutions</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Comprehensive cybersecurity solutions designed for large organizations with advanced threat protection, 
            compliance requirements, and custom integration needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
              Schedule Demo
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-border-primary hover:border-border-hover text-secondary px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Request Quote
            </button>
          </div>
        </div>

        {/* Enterprise Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Enterprise Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <div key={index} className="bg-primary rounded-2xl shadow-theme-lg p-8 border border-border-primary">
                <h3 className="text-2xl font-bold text-primary mb-4">{feature.name}</h3>
                <p className="text-secondary mb-6">{feature.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-secondary">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">{feature.pricing}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Industry Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-primary rounded-xl shadow-theme p-6 border border-border-primary hover:shadow-theme-lg transition-shadow duration-300">
                <div className="bg-secondary rounded-lg p-3 w-fit mb-4">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{useCase.title}</h3>
                <p className="text-secondary mb-4">{useCase.description}</p>
                <ul className="space-y-1">
                  {useCase.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-secondary flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Deployment Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deploymentOptions.map((option, index) => (
              <div key={index} className="bg-primary rounded-2xl shadow-theme-lg p-8 border border-border-primary">
                <h3 className="text-xl font-bold text-primary mb-4">{option.name}</h3>
                <p className="text-secondary mb-6">{option.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-secondary">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Best for:</strong> {option.bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-16 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Security & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">SOC 2 Type II</h3>
              <p className="text-gray-300 text-sm">Certified security controls</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">ISO 27001</h3>
              <p className="text-gray-300 text-sm">Information security management</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">GDPR Compliant</h3>
              <p className="text-gray-300 text-sm">Data privacy protection</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="font-semibold mb-2">HIPAA Ready</h3>
              <p className="text-gray-300 text-sm">Healthcare data protection</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Enterprise?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact our enterprise security experts to discuss your specific requirements and get a customized solution proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Schedule Consultation
            </button>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 border border-blue-500">
              Download Enterprise Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSolutions;