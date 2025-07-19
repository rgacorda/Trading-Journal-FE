"use client"

import React, { useState } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center gap-2 font-medium text-xl font-medium text-gray-900">
              <TrendingUp className="h-8 w-8 text-gray-900" />
            </Link>
            <span className="text-xl font-medium text-gray-900">Trade2Learn</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Pricing
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              About
            </a>
            {/* <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Contact
            </a> */}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link className="text-gray-600 hover:text-gray-900 transition-colors duration-200" href={"/login"}>
              Sign In
            </Link>
            <Button disabled className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              Coming Soon
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Pricing
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                About
              </a>
              {/* <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Contact
              </a> */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <button className="text-left text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Sign In
                </button>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-left">
                  Start Free Trial
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;