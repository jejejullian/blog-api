import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col justify-between overflow-hidden">
      {/* Background CRT Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50 z-0"></div>

      {/* Top Animated Bar */}
      <div className="relative z-10 w-full h-12 sm:h-16 bg-[repeating-linear-gradient(45deg,#D2FF00,#D2FF00_20px,#000000_20px,#000000_40px)] animate-stripes flex items-center border-b-4 border-border overflow-hidden shadow-[0_0_15px_rgba(210,255,0,0.3)]">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {/* Repeating elements to create infinite scroll illusion */}
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-black font-heading font-black text-xl sm:text-2xl tracking-[0.2em] uppercase px-6 py-1 bg-primary border-y-2 border-black mx-10 skew-box min-w-max">
              <span className="unskew-text">LOADING SYSTEM DATA // PLEASE WAIT</span>
            </span>
          ))}
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        {/* Glitching Text */}
        <h2 className="text-text-main font-heading font-black text-5xl sm:text-7xl tracking-widest uppercase text-shadow-neon glitch-hover">
          Loading
          <span className="inline-block animate-[bounce_1s_infinite_0ms]">.</span>
          <span className="inline-block animate-[bounce_1s_infinite_200ms]">.</span>
          <span className="inline-block animate-[bounce_1s_infinite_400ms]">.</span>
        </h2>
        <p className="text-primary font-bold tracking-widest text-sm sm:text-base mt-6 border-l-4 border-primary pl-3 bg-surface/50 pr-4 py-1 skew-box backdrop-blur-sm">
          <span className="unskew-text">RETRIEVING LATEST ARTICLES...</span>
        </p>
      </div>

      {/* Bottom Animated Bar */}
      <div className="relative z-10 w-full h-12 sm:h-16 bg-[repeating-linear-gradient(-45deg,#D2FF00,#D2FF00_20px,#000000_20px,#000000_40px)] animate-stripes flex items-center border-t-4 border-border overflow-hidden shadow-[0_0_15px_rgba(210,255,0,0.3)]">
        <div className="animate-marquee whitespace-nowrap flex items-center" style={{ animationDirection: 'reverse' }}>
           {/* Repeating elements to create infinite scroll illusion */}
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-black font-heading font-black text-xl sm:text-2xl tracking-[0.2em] uppercase px-6 py-1 bg-primary border-y-2 border-black mx-10 skew-box min-w-max">
              <span className="unskew-text">ACCESSING ARCHIVES // SECURE NETWORK</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
