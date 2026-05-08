import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../services/api";

const EditPostPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setContent(post.content);
      } catch (err) {
        const msg = err.response?.data?.error || "Failed to fetch post data.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updatePost(id, { title, content });
      navigate("/");
    } catch (err) {
      setError("Failed to update post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-primary font-heading font-black animate-pulse uppercase tracking-[0.5em]">Loading...</div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-32">
      <div className="mb-12 border-l-4 border-primary pl-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-heading font-black text-primary italic uppercase tracking-tighter">Edit Post</h1>
          <p className="text-text-muted font-bold uppercase tracking-[0.2em] text-xs mt-2">Edit post ID: #{id.padStart(4, "0")}</p>
        </div>
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
              className="w-full bg-black/50 border-2 border-border focus:border-primary px-6 py-4 text-xl font-heading text-text-main outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-text-muted uppercase tracking-[0.3em] mb-3 italic">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="12"
              className="w-full bg-black/50 border-2 border-border focus:border-primary px-6 py-4 text-text-main outline-none transition-all resize-none font-sans"
            ></textarea>
          </div>

          {error && <div className="bg-accent/10 border-l-4 border-accent p-4 text-accent text-xs font-bold uppercase tracking-widest">{error}</div>}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button type="submit" disabled={saving} className="zzz-btn flex-1 bg-primary text-black font-heading font-black py-5 uppercase tracking-[0.2em] skew-box hover:bg-white transition-all disabled:opacity-50">
              <span className="unskew-text">{saving ? "Saving..." : "Save Changes"}</span>
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
      </div>
    </div>
  );
};

export default EditPostPage;
