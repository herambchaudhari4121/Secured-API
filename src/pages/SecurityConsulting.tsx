import React, { useState } from 'react';
import { Users, Shield, BookOpen, Target, CheckCircle, Clock, ArrowRight, Mail, Phone } from 'lucide-react';
import { ConsultingService } from '../types';

const SecurityConsulting: React.FC = () => {
  const [selectedService, setSelectedService] = useState(0);

  const consultingServices: ConsultingService[] = [
    {
      name: 'Security Assessment & Audit',
      description: 'Comprehensive evaluation of your current security posture with detailed recommendations',
      duration: '2-4 weeks',
      deliverables: [
        'Complete security posture assessment',
        'Vulnerability analysis report',
        'Risk assessment matrix',
        'Prioritized remediation roadmap',
        'Executive summary presentation'
      ],
      pricing: '$15,000 - $50,000'
    },
    {
      name: 'Phishing Simulation & Training',
      description: 'Realistic phishing campaigns to test and train your employees on security awareness',
      duration: '4-8 weeks',
      deliverables: [
        'Custom phishing simulation campaigns',
        'Employee security awareness training',
        'Detailed analytics and reporting',
        'Personalized training recommendations',
        'Ongoing monitoring dashboard'
      ],
      pricing: '$5,000 - $25,000'
    },
    {
      name: 'Incident Response Planning',
      description: 'Develop comprehensive incident response procedures and train your security team',
      duration: '3-6 weeks',
      deliverables: [
        'Incident response playbook',
        'Communication templates',
        'Team training sessions',
        'Tabletop exercise facilitation',
        'Post-incident review procedures'
      ],
      pricing: '$20,000 - $75,000'
    },
    {
      name: 'Security Architecture Review',
      description: 'Expert review of your security architecture with optimization recommendations',
      duration: '3-5 weeks',
      deliverables: [
        'Architecture assessment report',
        'Security control evaluation',
        'Technology stack recommendations',
        'Implementation roadmap',
        'Cost-benefit analysis'
      ],
      pricing: '$25,000 - $100,000'
    }
  ];

  const expertiseAreas = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Threat Intelligence',
      description: 'Advanced threat hunting and intelligence analysis to identify emerging risks'
    },
    {
      icon: <Target className="h-8 w-8 text-red-600" />,
      title: 'Penetration Testing',
      description: 'Ethical hacking and vulnerability assessments to identify security weaknesses'
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: 'Security Awareness',
      description: 'Employee training programs to build a security-conscious organizational culture'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: 'Compliance & Governance',
      description: 'Regulatory compliance guidance and security governance framework development'
    }
  ];

  const consultingProcess = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Free 30-minute consultation to understand your security challenges and objectives'
    },
    {
      step: 2,
      title: 'Proposal & Planning',
      description: 'Detailed project proposal with timeline, deliverables, and resource requirements'
    },
    {
      step: 3,
      title: 'Assessment & Analysis',
      description: 'Comprehensive security assessment using industry-leading tools and methodologies'
    },
    {
      step: 4,
      title: 'Recommendations',
      description: 'Detailed findings report with prioritized recommendations and implementation guidance'
    },
    {
      step: 5,
      title: 'Implementation Support',
      description: 'Ongoing support during implementation phase with regular check-ins and guidance'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Security Consultant',
      credentials: 'CISSP, CISM, PhD in Cybersecurity',
      experience: '15+ years in enterprise security'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Senior Penetration Tester',
      credentials: 'OSCP, CEH, GPEN',
      experience: '12+ years in ethical hacking'
    },
    {
      name: 'Emily Johnson',
      role: 'Compliance Specialist',
      credentials: 'CISA, CRISC, JD',
      experience: '10+ years in regulatory compliance'
    },
    {
      name: 'David Kim',
      role: 'Threat Intelligence Analyst',
      credentials: 'GCTI, SANS FOR578',
      experience: '8+ years in threat analysis'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">Security Consulting Services</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            Expert cybersecurity consulting to strengthen your security posture, ensure compliance, 
            and protect your organization from evolving cyber threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Schedule Consultation
            </button>
            <button className="border-2 border-border-primary hover:border-border-hover text-secondary px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              Request Information
            </button>
          </div>
        </div>

        {/* Consulting Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Consulting Services</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              {consultingServices.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedService(index)}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-200 ${
                    selectedService === index
                      ? 'bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 shadow-theme-lg'
                      : 'bg-primary hover:bg-secondary border-2 border-border-primary hover:border-border-hover shadow-theme'
                  }`}
                >
                  <h3 className="text-lg font-semibold text-primary mb-2">{service.name}</h3>
                  <p className="text-sm text-secondary mb-3">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-medium">{service.duration}</span>
                    <span className="text-sm font-semibold text-primary">{service.pricing}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-primary rounded-2xl shadow-theme-lg p-8 border border-border-primary">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {consultingServices[selectedService].name}
                </h3>
                <p className="text-secondary mb-6">
                  {consultingServices[selectedService].description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-primary">Duration</span>
                    </div>
                    <p className="text-secondary">{consultingServices[selectedService].duration}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-primary">Investment</span>
                    </div>
                    <p className="text-secondary">{consultingServices[selectedService].pricing}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-4">Key Deliverables:</h4>
                  <ul className="space-y-3">
                    {consultingServices[selectedService].deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-secondary">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="bg-primary rounded-xl shadow-theme p-6 border border-border-primary text-center">
                <div className="bg-secondary rounded-lg p-3 w-fit mx-auto mb-4">
                  {area.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">{area.title}</h3>
                <p className="text-secondary text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Consulting Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Consulting Process</h2>
          <div className="space-y-8">
            {consultingProcess.map((phase, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {phase.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary mb-2">{phase.title}</h3>
                  <p className="text-secondary">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Meet Our Security Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-primary rounded-xl shadow-theme p-6 border border-border-primary text-center">
                <div className="bg-gray-300 dark:bg-gray-600 rounded-full w-20 h-20 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-primary mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-secondary mb-2">{member.credentials}</p>
                <p className="text-sm text-secondary">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Strengthen Your Security?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our security experts to discuss your specific challenges 
            and learn how we can help protect your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Call +91 9484461156
            </button>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 border border-blue-500 flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              Email heramb.chaudhri@gmail.com
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityConsulting;