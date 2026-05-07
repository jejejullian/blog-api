import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/api';
import PostCard from '../components/PostCard';
import { FiAlertCircle, FiArchive } from 'react-icons/fi';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load articles. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
        <div className="w-16 h-16 border-4 border-surface border-t-primary border-r-primary skew-box animate-spin"></div>
        <p className="text-primary font-heading font-bold uppercase tracking-widest text-sm glitch-hover text-shadow-neon">Loading Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-accent/10 border-l-8 border-accent p-6 sm:p-8 skew-box max-w-2xl mx-auto mt-10">
        <div className="unskew-text">
          <h3 className="text-accent font-heading font-bold text-2xl uppercase mb-2 flex items-center gap-2">
            <FiAlertCircle className="w-6 h-6" />
            System Error
          </h3>
          <p className="text-text-main font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 sm:space-y-20 pt-8 sm:pt-16 pb-12 relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 text-[15rem] font-heading font-black text-white/[0.03] pointer-events-none leading-none select-none overflow-hidden skew-box z-0">
        01
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-2 sm:px-4">
        <div className="inline-block bg-primary text-black px-3 py-1 font-bold text-xs uppercase tracking-widest mb-4 skew-box">
          <span className="unskew-text">System Broadcast</span>
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-heading text-text-main uppercase leading-[0.9] tracking-tighter mb-6 relative">
          <span className="block text-white glitch-hover">Explore</span>
          <span className="block text-transparent" style={{ WebkitTextStroke: '2px var(--primary)' }}>Articles</span>
        </h1>
        <p className="text-lg sm:text-xl text-text-muted font-medium max-w-xl border-l-4 border-primary pl-4 py-1">
          Discover the latest insights, tutorials, and stories.
        </p>
      </section>

      {/* Articles Grid */}
      <section className="relative z-10">
        <div className="flex items-center gap-4 mb-8 sm:mb-10 px-2">
          <div className="bg-text-main text-background font-heading font-bold uppercase px-4 py-1 skew-box text-xl tracking-wider">
            <span className="unskew-text">Latest Articles</span>
          </div>
          <div className="h-1 flex-grow bg-surface relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-[repeating-linear-gradient(45deg,#D2FF00,#D2FF00_10px,transparent_10px,transparent_20px)]"></div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="bg-surface border-2 border-border p-10 sm:p-16 text-center relative overflow-hidden skew-box">
            <div className="unskew-text relative z-10">
              <FiArchive className="w-16 h-16 mx-auto mb-4 text-border" />
              <h3 className="text-2xl font-heading font-bold uppercase text-text-muted mb-2">No Articles Yet</h3>
              <p className="text-text-muted">The database is currently empty.</p>
            </div>
            {/* Background striping */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.03)_10px,rgba(255,255,255,0.03)_20px)] pointer-events-none"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
