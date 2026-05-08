import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api";

const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost({ title, content });
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to create post. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-32">
      <div className="mb-12 border-l-4 border-primary pl-6">
        <h1 className="text-4xl font-heading font-black text-primary italic uppercase tracking-tighter">Create New Post</h1>
        <p className="text-text-muted font-bold uppercase tracking-[0.2em] text-xs mt-2">Write a new blog post</p>
      </div>

      <div className="bg-surface border-2 border-border p-8 relative">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xs font-black text-text-muted uppercase tracking-[0.3em] mb-3 italic">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter title..."
              className="w-full bg-black/50 border-2 border-border focus:border-primary px-6 py-4 text-xl font-heading text-text-main outline-none transition-all placeholder:opacity-20"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-text-muted uppercase tracking-[0.3em] mb-3 italic">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="12"
              placeholder="Write your content here..."
              className="w-full bg-black/50 border-2 border-border focus:border-primary px-6 py-4 text-text-main outline-none transition-all resize-none font-sans placeholder:opacity-20"
            ></textarea>
          </div>

          {error && <div className="bg-accent/10 border-l-4 border-accent p-4 text-accent text-xs font-bold uppercase tracking-widest">{error}</div>}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button type="submit" disabled={loading} className="zzz-btn flex-1 bg-primary text-black font-heading font-black py-5 uppercase tracking-[0.2em] skew-box hover:bg-white transition-all disabled:opacity-50">
              <span className="unskew-text">{loading ? "Saving..." : "Create Post"}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-surface border-2 border-border text-text-muted font-heading font-black py-5 uppercase tracking-[0.2em] skew-box hover:text-white hover:border-white transition-all"
            >
              <span className="unskew-text">Cancel</span>
            </button>
          </div>
        </form>

        {/* Status indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-50">
          <span className="text-[10px] font-mono text-text-muted">READY</span>
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;
