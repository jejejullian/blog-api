import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });

  return (
    <Link
      to={`/posts/${post.id}`}
      className="block group outline-none"
    >
      <div className="bg-surface border-2 border-border p-6 sm:p-8 zzz-card h-full flex flex-col relative overflow-hidden">
        {/* Top left corner accent */}
        <div
          className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-transparent group-hover:border-t-primary group-hover:border-l-primary transition-colors"
        ></div>

        {/* Background diagonal stripes (subtle) */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)] pointer-events-none group-hover:opacity-50 transition-opacity"></div>

        <div className="flex-grow relative z-10">
          <div
            className="flex items-center justify-between mb-4 border-b-2 border-border pb-3 transition-colors group-hover:border-primary/30"
          >
            <span
              className="font-heading font-bold uppercase text-xs px-2 py-0.5 skew-box bg-border text-text-muted group-hover:bg-primary group-hover:text-black transition-colors"
            >
              <span className="unskew-text">Article</span>
            </span>
            <span
              className="font-heading font-bold text-text-muted text-sm tracking-widest transition-colors group-hover:text-primary"
            >
              {formattedDate}
            </span>
          </div>

          <h2
            className="text-xl sm:text-2xl font-heading font-bold uppercase text-text-main mb-3 transition-colors line-clamp-2 leading-tight tracking-wide group-hover:text-primary"
          >
            {post.title}
          </h2>

          <p className="text-sm text-text-muted line-clamp-3 leading-relaxed mb-6 font-medium">
            {post.content}
          </p>
        </div>

        <div className="mt-auto relative z-10 flex justify-end">
          <div
            className="font-heading font-bold uppercase text-sm px-6 py-2 skew-box inline-flex items-center justify-center gap-2 transition-colors bg-border text-text-muted group-hover:bg-primary group-hover:text-black"
          >
            <span className="unskew-text whitespace-nowrap leading-none">
              Read
            </span>
            <FiArrowRight className="w-4 h-4 shrink-0 stroke-[3px] unskew-text" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
