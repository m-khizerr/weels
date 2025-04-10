'use client'
import Head from 'next/head';
import { useState } from 'react';
import Navbar from './components/navbar';
import lambo from '../../public/lambo.png';
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
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>weels - Find Your Perfect Used Car</title>
        <meta name="description" content="Find your perfect used car with Weelz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar activePage="home" />

      <main className="flex-grow pt-16">
        <section className="relative h-screen bg-gray-900">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${lambo.src})` }}></div>
          </div>
          
          <div className="relative h-full flex flex-col justify-center px-8 sm:px-16">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold text-white mb-4">Find Your Perfect Used Car</h1>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-semibold text-center text-gray-500 mb-16">About weels</h2>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <img 
                  src="/car.png"
                  alt="Green compact car with weels logo" 
                  className="w-full h-auto" 
                />
              </div>
              
              <div className="w-full md:w-1/2 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  At weels, we're dedicated to helping you find your perfect car. We believe
                  that everyone deserves a reliable vehicle at an affordable price.
                </p>
                <p className="text-gray-600 mb-8">
                  We'll soon be launching a mobile app to find and purchase used cars with
                  the advice and support of our expert staff. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Join Our Mailing List section with better responsiveness */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-500 mb-8 sm:mb-16">Join Our Mailing List</h2>
            <div className="flex flex-col text-center w-full justify-center items-center">
              
              <p className="text-gray-600 mb-4 px-4 max-w-2xl">
                Be the first to be notified of the launch of our mobile app!
              </p>
                  
              <div className="w-full px-4">    
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="flex-grow px-4 py-2 text-black shadow-xs shadow-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-50 w-full"
                    value={subscribeEmail}
                    onChange={handleSubscribeChange}
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition duration-300 cursor-pointer whitespace-nowrap"
                  >
                    SIGN UP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Contact Us section with better responsiveness */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-500 mb-8 sm:mb-16">Contact Us</h2>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="w-full md:w-1/2">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Get in Touch!</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 flex flex-col">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="flex-grow px-4 py-2 text-black shadow-xs shadow-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-50 w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="flex-grow px-4 py-2 text-black shadow-xs shadow-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-50 w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      value={formData.message}
                      onChange={handleChange}
                      className="flex-grow px-4 py-2 text-black shadow-xs shadow-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-50 w-full"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      id="newsletter" 
                      name="newsletter" 
                      type="checkbox" 
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      checked={subscribeToNewsletter}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                      Sign up for our email list for updates, promotions, and more.
                    </label>
                  </div>
                  
                  <div className='self-center mt-2'>
                    <button 
                      type="submit" 
                      className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition duration-300 cursor-pointer"
                    >
                      SEND
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">weels</h3>
                <p className="text-gray-600 mb-2">hello@weels.ai</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}