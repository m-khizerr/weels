'use client';
import { useEffect } from 'react';
import Navbar from '../components/navbar'; 
import Footer from '../components/footer';

export default function SearchPage() {
  useEffect(() => {
    console.log("Search page loaded");
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar activePage="search" />
      
      <div className="w-full h-screen pt-16">
        <iframe
          src="https://micarbuddy.com/search/"
          title="MicarBuddy WordPress Site"
          className="w-full h-full border-0"
        ></iframe>
      </div>

      <Footer />
    </main>
  );
}