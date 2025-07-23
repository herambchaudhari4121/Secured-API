import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const linkClass = (path: string) => 
    `transition-colors duration-200 font-medium ${
      isActive(path) 
        ? 'text-blue-600' 
        : 'text-secondary hover:text-blue-600'
    }`;

  return (
    <header className="bg-primary shadow-theme-lg sticky top-0 z-50 border-b border-border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-primary">SecureURL</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/scanner" className={linkClass('/scanner')}>
              Scanner
            </Link>
            <Link to="/threat-intelligence" className={linkClass('/threat-intelligence')}>
              Threat Intelligence
            </Link>
            <Link to="/api" className={linkClass('/api')}>
              API
            </Link>
            <Link to="/enterprise" className={linkClass('/enterprise')}>
              Enterprise
            </Link>
            <Link to="/consulting" className={linkClass('/consulting')}>
              Consulting
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105">
              Get API Key
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-primary">
            <nav className="flex flex-col space-y-3">
              <Link to="/scanner" className={linkClass('/scanner')} onClick={() => setIsMenuOpen(false)}>
                Scanner
              </Link>
              <Link to="/threat-intelligence" className={linkClass('/threat-intelligence')} onClick={() => setIsMenuOpen(false)}>
                Threat Intelligence
              </Link>
              <Link to="/api" className={linkClass('/api')} onClick={() => setIsMenuOpen(false)}>
                API
              </Link>
              <Link to="/enterprise" className={linkClass('/enterprise')} onClick={() => setIsMenuOpen(false)}>
                Enterprise
              </Link>
              <Link to="/consulting" className={linkClass('/consulting')} onClick={() => setIsMenuOpen(false)}>
                Consulting
              </Link>
              <div className="pt-2">
                <DarkModeToggle />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 mt-3">
                Get API Key
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;