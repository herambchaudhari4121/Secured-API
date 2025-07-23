import React from 'react';
import { BookOpen, AlertTriangle, Eye, Link } from 'lucide-react';

const Education: React.FC = () => {
  const tips = [
    {
      icon: <Eye className="h-6 w-6 text-blue-600" />,
      title: 'Check the URL carefully',
      description: 'Look for misspellings, unusual domains, or suspicious characters in the web address.',
    },
    {
      icon: <Link className="h-6 w-6 text-green-600" />,
      title: 'Verify HTTPS encryption',
      description: 'Ensure the website uses HTTPS (look for the lock icon) before entering sensitive information.',
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
      title: 'Be wary of urgent messages',
      description: 'Phishing attacks often create false urgency to pressure you into quick decisions.',
    },
    {
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
      title: 'Verify through official channels',
      description: 'When in doubt, contact the organization directly through their official website or phone.',
    },
  ];

  const commonSigns = [
    'Urgent language demanding immediate action',
    'Requests for sensitive information via email',
    'Generic greetings like "Dear Customer"',
    'Suspicious sender email addresses',
    'Poor grammar and spelling errors',
    'Unexpected attachments or downloads',
  ];

  return (
    <section id="education" className="py-20 bg-blue-50 dark:bg-blue-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Stay Safe Online
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Knowledge is your best defense. Learn how to identify and avoid phishing attempts 
            with our comprehensive security education resources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-primary rounded-2xl shadow-theme-lg p-8 border border-border-primary">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              Protection Tips
            </h3>
            <div className="space-y-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-secondary rounded-lg p-2 flex-shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">{tip.title}</h4>
                    <p className="text-secondary">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary rounded-2xl shadow-theme-lg p-8 border border-border-primary">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              Common Phishing Signs
            </h3>
            <p className="text-secondary mb-6">
              Watch out for these red flags that often indicate phishing attempts:
            </p>
            <ul className="space-y-3">
              {commonSigns.map((sign, index) => (
                <li key={index} className="flex items-center text-secondary">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  {sign}
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-300 font-medium">
                Remember: Legitimate organizations will never ask for passwords, 
                PINs, or sensitive information via email or text message.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need More Security Resources?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Download our comprehensive cybersecurity guide and stay updated 
              with the latest threat intelligence reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Download Security Guide
              </button>
              <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 border border-blue-500">
                Subscribe to Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;