'use client'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import lambo from '../../public/lamboo.png';
import Footer from './components/footer';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [attachments, setAttachments] = useState(0);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);


  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubscribeChange = (e) => {
    setSubscribeEmail(e.target.value);
  };
  
  const handleCheckboxChange = (e) => {
    setSubscribeToNewsletter(e.target.checked);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send form data to the API endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipient: 'm.khizerr01@gmail.com'
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Message sent!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };
  
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: subscribeEmail }),
      });
      
      if (response.ok) {
        alert('Successfully subscribed!');
        setSubscribeEmail('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert(`Failed to subscribe: ${error.message}`);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen text-black">
      <Head>
        <title>weels - Find Your Perfect Used Car</title>
        <meta name="description" content="Find your perfect used car with Weelz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar activePage="home" />

      <main className="flex-grow pt-16">

      <section className="relative h-screen md:h-screen">
        {/* Base background - black to light gray gradient with 40-60 ratio */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to bottom, #000000 0%, #000000 10%, #0a0a0a 20%, #111111 30%, #222222 40%, #333333 50%, #555555 60%, #777777 70%, #999999 80%, #bbbbbb 90%, #dddddd 100%)'
                    }}
        ></div>
        
        {/* Content container */}
        <div className="px-4 mx-auto max-w-[95vw] md:max-w-[70vw] sm:px-6 lg:px-8">
          {/* Text at the top left corner */}
          <div className="absolute top-0 left-0 px-8 sm:pl-40 pt-[20vh] md:pt-[10vh] z-10 max-w-full md:max-w-[70vw]">
              <h1 
                className="text-3xl font-bold text-white md:text-7xl"
                // style={{ 
                //   textShadow: '0 1px 5px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.9)' 
                // }}
              >
                Finding and maintaining your perfect used car
              </h1>
          </div>
          
          {/* Car image placed lower in the viewport */}
          <div className="absolute inset-0 flex items-center justify-center mt-[10vh] md:mt-[10vh]">
            <div className="w-[90vw] md:w-2/5">
              <img 
                src={lambo.src} 
                alt="Lamborghini" 
                className="object-contain w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

        <section className="py-16 bg-white">
          <div className="px-4 mx-auto max-w-[95vw] md:max-w-[70vw] sm:px-6 lg:px-8">
            <h2 className="mb-16 text-4xl font-semibold text-center">About weels</h2>
            
            <div className="flex flex-col items-center gap-12 md:flex-col">
              <div className="w-full md:w-1/2">
                <img 
                  src="/car.png"
                  alt="Green compact car with weels logo" 
                  className="w-full h-auto" 
                />
              </div>
              
              <div className="w-full">
                <h3 className="mb-4 text-xl font-semibold text-center">Our Mission</h3>
                <p className="mb-2">
                  At weels, we're dedicated to helping you find and maintain your perfect car.
                </p>
                <p className="mb-2 ">
                  A car is more than another piece of equipment – it’s your lifeline to work, school, and all of your daily activities. And, an expression of your personality. You deserve a vehicle that’s affordable, reliable, long lasting, and attractive.
                </p>
                <p className="mb-2">
                  Our goal is to become your trusted partner at purchase and throughout the lifetime of your vehicle.                </p>
                <p className="mb-8">
                  We'll soon be launching our mobile app. Stay tuned!                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Join Our Mailing List section with better responsiveness */}
        <section id='mailingList' className="py-12 bg-white sm:py-5">
          <div className="px-4 mx-auto max-w-[95vw] md:max-w-[70vw] sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-semibold text-center sm:text-4xl sm:mb-10">Join Our Mailing List</h2>
            <div className="flex flex-col w-full text-left">
              
              <p className="max-w-2xl px-4 mb-4 text-left">
                Be the first to be notified of the launch of our mobile app!
              </p>
                  
              <div className="w-full">    
                <form onSubmit={handleSubscribe} className="flex flex-col items-center gap-4">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="flex-grow w-full px-4 py-2 text-black shadow-xs shadow-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-50"
                    value={subscribeEmail}
                    onChange={handleSubscribeChange}
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-[#2C4EEE] w-full md:w-2/5 text-white px-6 py-2 rounded-md font-extrabold hover:bg-blue-900 transition duration-300 cursor-pointer whitespace-nowrap"
                  >
                    SIGN UP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Contact Us section with better responsiveness */}
        <section className="py-12 bg-white sm:py-6">
          <div className="px-4 mx-auto max-w-[95vw] md:max-w-[70vw] sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-semibold text-center sm:text-4xl sm:mb-5">Contact Us</h2>
            
            <div className="flex flex-col gap-8 md:flex-col md:gap-12">
              <div className="w-full">                
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium">Name*</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="flex-grow w-full px-4 py-2 text-black shadow-xs shadow-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium">Email*</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="flex-grow w-full px-4 py-2 text-black shadow-xs shadow-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1 text-sm font-medium">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      value={formData.message}
                      onChange={handleChange}
                      className="flex-grow w-full px-4 py-2 text-black shadow-xs max-h-20 shadow-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-50"
                    ></textarea>
                  </div>
                  
                  <div className='flex items-center self-center justify-center min-w-full mt-2'>
                    <button 
                      type="submit" 
                      className="bg-[#2C4EEE] w-full md:w-2/5  text-white px-6 py-2 rounded-md font-extrabold hover:bg-blue-900 transition duration-300 cursor-pointer whitespace-nowrap"
                    >
                      SEND
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}