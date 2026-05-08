import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed top-0 inset-x-0 z-40 bg-surface/95 border-b-4 border-primary backdrop-blur-sm shadow-[0_10px_30px_rgba(210,255,0,0.05)]">
      {/* Authentic ZZZ hazard line */}
      <div className="h-1 w-full bg-[repeating-linear-gradient(45deg,#D2FF00,#D2FF00_10px,#000_10px,#000_20px)] opacity-80"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center text-black font-heading font-black text-xl transform skewX(-10deg) group-hover:scale-110 group-hover:bg-white transition-all duration-200">
              <span className="transform skewX(10deg)">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-heading font-black text-text-main tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">
                Blog Admin
              </span>
              <span className="text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase leading-none mt-1">
                Admin Panel
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            {token ? (
              <>
                <Link
                  to="/"
                  className="hidden sm:inline-block text-xs font-bold text-text-muted hover:text-primary uppercase tracking-widest transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/posts/new"
                  className="text-xs font-bold text-black bg-primary px-4 py-2 uppercase tracking-widest skew-box zzz-btn border-2 border-primary hover:text-primary hover:bg-transparent transition-all"
                >
                  <span className="unskew-text">New Post</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-accent border-2 border-accent/30 hover:border-accent hover:bg-accent hover:text-white px-4 py-2 uppercase tracking-widest skew-box transition-all"
                >
                  <span className="unskew-text">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 mr-4 opacity-80">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_#FF0033]"></span>
                <span className="text-xs font-bold text-accent tracking-widest uppercase">Restricted Area</span>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
