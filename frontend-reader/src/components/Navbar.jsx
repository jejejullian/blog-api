import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0 z-40 bg-surface/95 border-b-4 border-primary backdrop-blur-sm shadow-[0_10px_30px_rgba(210,255,0,0.05)]">
      {/* Authentic ZZZ hazard line */}
      <div className="h-1 w-full bg-[repeating-linear-gradient(45deg,#D2FF00,#D2FF00_10px,#000_10px,#000_20px)] opacity-80"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center text-black font-heading font-black text-xl transform skewX(-10deg) group-hover:scale-110 group-hover:bg-white transition-all duration-200">
              <span className="transform skewX(10deg)">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-heading font-black text-text-main tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">
                Blog Reader
              </span>
              <span className="text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase leading-none mt-1">
                Web Application
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 mr-4 opacity-80">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#D2FF00]"></span>
              <span className="text-xs font-bold text-primary tracking-widest uppercase text-shadow-neon">Online</span>
            </div>
            <Link
              to="/"
              className="text-sm font-bold text-black bg-primary px-6 py-2 uppercase tracking-widest skew-box zzz-btn border-2 border-primary hover:text-primary hover:bg-transparent hover:border-primary transition-colors"
            >
              <span className="unskew-text relative z-10">Home</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
