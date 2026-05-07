import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById, getCommentsByPost, createComment } from '../services/api';
import CommentForm from '../components/CommentForm';
import { FiArrowLeft } from 'react-icons/fi';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          getPostById(id),
          getCommentsByPost(id)
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError('Data corruption detected. File inaccessible.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleAddComment = async (commentData) => {
    try {
      const newComment = await createComment(id, commentData);
      setComments([...comments, newComment]);
    } catch (err) {
      alert('Transmission failed. Check proxy connection.');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
        <div className="w-16 h-16 border-4 border-surface border-t-primary border-r-primary skew-box animate-spin"></div>
        <p className="text-primary font-heading font-bold uppercase tracking-widest text-sm glitch-hover text-shadow-neon">Loading Article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center space-y-6 pt-20">
        <div className="bg-accent/10 border-l-8 border-accent p-6 sm:p-8 skew-box max-w-lg mx-auto">
          <div className="unskew-text">
            <h3 className="text-accent font-heading font-bold text-2xl uppercase mb-2">Error</h3>
            <p className="text-text-main font-medium">{error || 'Article not found.'}</p>
          </div>
        </div>
        <Link to="/" className="inline-flex items-center text-primary font-heading font-bold uppercase tracking-widest hover:text-white transition-colors text-shadow-neon">
          <FiArrowLeft className="w-5 h-5 mr-2 stroke-[2.5]" />
          Back to Home
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0 pt-8 pb-16 relative">
      <Link to="/" className="inline-flex items-center bg-surface border border-border text-text-muted hover:text-primary hover:border-primary mb-8 px-4 py-1.5 skew-box transition-all group">
        <FiArrowLeft className="w-4 h-4 shrink-0 align-middle transform group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
        <span className="unskew-text font-heading font-bold uppercase text-sm tracking-wider leading-none">
          Back
        </span>
      </Link>

      <article className="mb-16 bg-surface border-2 border-border p-6 sm:p-10 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-[repeating-linear-gradient(45deg,#2A2A2A,#2A2A2A_5px,transparent_5px,transparent_10px)] transform rotate-45 translate-x-8 -translate-y-8 opacity-50"></div>

        <header className="mb-10 border-b-4 border-border pb-8 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary text-black font-heading font-bold uppercase text-xs px-2 py-0.5 skew-box">
              <span className="unskew-text text-center">POST_ID: {post.id.toString().padStart(4, '0')}</span>
            </span>
            <span className="font-heading font-bold text-primary tracking-widest text-sm backdrop-blur-sm bg-surface/50 px-2 py-0.5 rounded">
              <span className="text-text-muted">DATE //</span> {formattedDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-6xl font-heading font-black text-text-main uppercase leading-[1.1] tracking-wide text-shadow-neon backdrop-blur-sm bg-surface/30 p-2 -ml-2 rounded inline-block">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-base sm:prose-lg max-w-none text-text-main font-sans leading-relaxed prose-p:mb-6 prose-strong:text-primary">
          {post.content.split('\n').map((paragraph, idx) => (
            paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
          ))}
        </div>
      </article>

      {/* Cyber separator */}
      <div className="flex items-center gap-4 mb-12 opacity-80">
        <div className="h-1 bg-primary w-12 skew-box"></div>
        <div className="h-1 bg-border flex-grow"></div>
        <div className="font-heading font-bold text-primary tracking-widest uppercase text-sm">End of Article</div>
      </div>

      <div className="space-y-10">
        <div className="flex items-center justify-between border-b-2 border-border pb-4">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold uppercase text-text-main flex items-center gap-3">
            Comments
          </h2>
          <div className="bg-surface border border-primary text-primary font-heading font-bold px-3 py-1 skew-box">
            <span className="unskew-text">{comments.length} MSG</span>
          </div>
        </div>

        {comments.length === 0 ? (
          <div className="bg-surface border-2 border-border border-dashed p-8 text-center skew-box opacity-70">
            <p className="unskew-text text-text-muted font-heading font-bold uppercase tracking-wider">
              No comments yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-surface border-l-4 border-l-border border-t border-r border-b border-border p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 relative group hover:border-primary transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-background border-2 border-border flex items-center justify-center text-text-muted font-heading font-black text-xl uppercase skew-box group-hover:border-primary group-hover:text-primary transition-colors">
                    <span className="unskew-text">{(comment.guestName || 'A')[0]}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-heading font-bold text-text-main group-hover:text-primary transition-colors uppercase tracking-wide">
                      {comment.guestName || 'Anonymous'}
                    </h4>
                    <span className="text-xs font-bold text-text-muted font-heading tracking-widest">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-text-muted group-hover:text-text-main transition-colors font-medium text-sm sm:text-base leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <CommentForm onSubmit={handleAddComment} />
      </div>
    </div>
  );
};

export default PostDetailPage;
