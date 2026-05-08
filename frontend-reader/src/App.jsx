import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial system loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-main font-sans selection:bg-primary selection:text-black overflow-x-hidden relative">
      {/* Scanline CRT overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20"></div>
      
      {/* Huge ZZZ Proxy Emblem Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.03] select-none mix-blend-screen overflow-hidden">
        <img src="/assets/emblem.png" alt="" className="w-auto h-[120vh] object-contain opacity-50 absolute right-[-10vw] top-1/2 -translate-y-1/2 blur-[2px]" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-[-10vw] -rotate-90 origin-center text-[15rem] font-heading font-black text-white leading-none whitespace-nowrap opacity-30 skew-box">
          BLOG READER
        </div>
      </div>

      <Navbar />
      
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
