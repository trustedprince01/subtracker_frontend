
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-darkBlue-900 py-12 border-t border-purple-900 border-opacity-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <svg 
                className="w-6 h-6 mr-2 text-purple-300"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span className="text-lg font-semibold text-purple-300">SubTrackr</span>
            </div>
            <p className="text-gray-400 mb-6">
              Take control of your recurring expenses and never miss a payment again.
            </p>
            <p className="text-gray-500 text-sm">© {currentYear} SubTrackr. All rights reserved.</p>
          </div>
          
          <div>
            <h3 className="text-gray-100 font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#features" className="text-gray-400 hover:text-purple-300 transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-gray-400 hover:text-purple-300 transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/#testimonials" className="text-gray-400 hover:text-purple-300 transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/#faq" className="text-gray-400 hover:text-purple-300 transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-100 font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-purple-300 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-purple-300 transition-colors">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-purple-300 transition-colors">Terms</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-purple-300 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
