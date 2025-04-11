'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ activePage = 'home' }) {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      setVisible(
        (prevScrollPos > currentScrollPos) || currentScrollPos < 10
      );
      
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);
  
  const navbarStyle = {
    transform: visible ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 0.3s ease'
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const scrollToMailingList = () => {
    if (window.location.pathname === '/' || window.location.pathname === '') {
      const mailingListSection = document.getElementById('mailingList');
      if (mailingListSection) {
        mailingListSection.scrollIntoView({ behavior: 'smooth' });
        
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    } else {
      window.location.href = '/#mailingList';
    }
  };

  return (
    <>
      <nav 
        className="bg-white shadow-md fixed w-full z-10"
        style={navbarStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[70px]">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center align-end">
                <div className="h-8 w-8 mr-2">
                  <img src='/weelzLogo.png' className='w-9 h-9' />
                </div>
                <span className="text-xl font-nunito text-gray-800 mt-2">weels</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8 mt-2">
                <Link 
                  href="/" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activePage === 'home' 
                      ? 'border-green-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/blogs" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activePage === 'blogs' 
                      ? 'border-green-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Blogs
                </Link>
                <Link 
                  href="/search" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activePage === 'search' 
                      ? 'border-green-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Search
                </Link>
              </div>
            </div>
            
            <div className='h-full flex items-center align-middle'>
              <button 
                className="bg-red-600 hover:bg-red-700 font-bold text-white px-2 sm:px-4 py-2 text-xs sm:text-sm rounded transition duration-300 whitespace-nowrap"
                onClick={() => scrollToMailingList()}
              >
                EARLY APP ACCESS
              </button>
            </div>
            
            <div className="hidden lg:flex items-center space-x-4">
              <a href="#" className="flex items-center">
                <img 
                  src="/appstore.png" 
                  alt="Download on the App Store" 
                  className="h-8"
                />
              </a>
              <a href="#" className="flex items-center">
                <img 
                  src="/playstore.png" 
                  alt="Get it on Google Play" 
                  className="h-8"
                />
              </a>
            </div>
            
            <div className="md:hidden flex items-center">
              <button 
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1 border-t border-gray-200">
            <Link 
              href="/" 
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                activePage === 'home'
                  ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
                  : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/blogs" 
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                activePage === 'blogs'
                  ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
                  : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link 
              href="/search" 
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                activePage === 'search'
                  ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
                  : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
            
            {/* App store badges in mobile menu */}
            <div className="flex space-x-2 pl-3 pt-2">
              <a href="#" className="flex items-center">
                <img 
                  src="/appstore.png" 
                  alt="Download on the App Store" 
                  className="h-8"
                />
              </a>
              <a href="#" className="flex items-center">
                <img 
                  src="/playstore.png" 
                  alt="Get it on Google Play" 
                  className="h-8"
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-0 bg-black opacity-25"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}