import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="mt-auto py-10 sm:py-12 border-t-2 border-border/60 px-6 sm:px-12 bg-surface relative z-10 skew-box mx-2 sm:mx-4 mb-4 border-b-4 border-b-primary/20 overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.01)_10px,rgba(255,255,255,0.01)_20px)] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto unskew-text w-full relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-4 mb-10">
          
          {/* Brand & Status */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 bg-primary flex items-center justify-center text-black font-heading font-black text-xl skew-box">
                <span className="unskew-text">B</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-black text-text-main tracking-tighter uppercase leading-none">
                  Blog Reader
                </span>
                <span className="text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase leading-none mt-1">
                  Web Application
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 shrink-0 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#D2FF00]"></span>
              <span className="text-xs font-bold text-primary tracking-widest uppercase text-shadow-neon">System Operational</span>
            </div>
            <p className="text-text-muted text-xs sm:text-sm mt-2 font-medium">
              Accessing the latest articles and data archives. Connection secure.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-text-main font-heading font-bold uppercase tracking-widest text-sm border-b border-border pb-2 mb-2 inline-block w-fit">
              Navigation
            </h4>
            <Link to="/" className="text-text-muted hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider w-fit flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3"></span>
              Home
            </Link>
            <a href="#" className="text-text-muted hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider w-fit flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3"></span>
              About Us
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider w-fit flex items-center gap-2 group">
              <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3"></span>
              Contact
            </a>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <h4 className="text-text-main font-heading font-bold uppercase tracking-widest text-sm border-b border-border pb-2 mb-2 inline-block w-fit">
              Connect
            </h4>
            <div className="flex gap-4">
              <a href="https://github.com/jejejullian" target="_blank" rel="noopener noreferrer" className="w-10 h-10 shrink-0 bg-background border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary skew-box transition-colors group" title="GitHub">
                <FiGithub className="w-5 h-5 unskew-text group-hover:text-primary transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/juliannurfadzlin/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 shrink-0 bg-background border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary skew-box transition-colors group" title="LinkedIn">
                <FiLinkedin className="w-5 h-5 unskew-text group-hover:text-primary transition-colors" />
              </a>
              <a href="https://juliannnfadzlin.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 shrink-0 bg-background border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary skew-box transition-colors group" title="Portfolio">
                <FiGlobe className="w-5 h-5 unskew-text group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-text-muted text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} BLOG READER INC.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-[10px] sm:text-xs text-text-muted font-bold tracking-wider">
            <a href="#" className="hover:text-primary transition-colors uppercase">Terms</a>
            <a href="#" className="hover:text-primary transition-colors uppercase">Privacy</a>
          </div>
        </div>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-[repeating-linear-gradient(45deg,#2A2A2A,#2A2A2A_5px,transparent_5px,transparent_10px)] transform rotate-45 translate-x-12 translate-y-12 opacity-30 pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
