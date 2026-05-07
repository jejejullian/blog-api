import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const CommentForm = ({ onSubmit }) => {
  const [guestName, setGuestName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !guestName.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ guestName, content });
      setGuestName('');
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface border-2 border-border mt-10 relative skew-box p-6 sm:p-8 group hover:border-primary/30 transition-colors">
      <div className="unskew-text w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 bg-primary animate-pulse"></div>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-text-main uppercase tracking-wider text-shadow-neon">Add a Comment</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group/input">
            <label htmlFor="guestName" className="block text-xs sm:text-sm font-heading font-bold text-text-muted mb-2 uppercase tracking-widest group-focus-within/input:text-primary transition-colors">
              [ Your Name ]
            </label>
            <input
              type="text"
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary focus:ring-0 transition-colors outline-none text-text-main font-medium placeholder:text-text-muted/30 font-heading tracking-wide"
              placeholder="ENTER NAME..."
            />
          </div>
          <div className="group/input">
            <label htmlFor="content" className="block text-xs sm:text-sm font-heading font-bold text-text-muted mb-2 uppercase tracking-widest group-focus-within/input:text-primary transition-colors">
              [ Your Comment ]
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary focus:ring-0 transition-colors outline-none text-text-main font-medium placeholder:text-text-muted/30 font-sans resize-y"
              placeholder="WRITE YOUR COMMENT..."
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto zzz-btn bg-primary text-black font-heading font-black text-lg uppercase tracking-widest px-8 py-3 skew-box border-2 border-primary hover:bg-transparent hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed group/btn flex items-center justify-center cursor-pointer gap-2"
            >
              <span className="unskew-text">
                <span className="flex items-center justify-center gap-2">
                  <span>{isSubmitting ? 'Sending...' : 'Send'}</span>
                  {!isSubmitting && (
                    <FiSend className="w-5 h-5 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform stroke-[2]" />
                  )}
                </span>
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Decorative hazard tape corner */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-[repeating-linear-gradient(45deg,#2A2A2A,#2A2A2A_5px,#000_5px,#000_10px)] opacity-50 transform translate-x-8 translate-y-8 rotate-45 pointer-events-none"></div>
    </div>
  );
};

export default CommentForm;
