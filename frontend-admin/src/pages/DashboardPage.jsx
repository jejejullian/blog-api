import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPostsAdmin, deletePost, togglePublish } from "../services/api";
import PostTable from "../components/PostTable";

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FIX: fetchPosts dipindah ke scope komponen agar bisa dipanggil dari tombol Retry
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllPostsAdmin();
      setPosts(data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch posts.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post? This action is irreversible.")) {
      try {
        await deletePost(id);
        setPosts(posts.filter((post) => post.id !== id));
      } catch (err) {
        const msg = err.response?.data?.error || "Failed to delete post.";
        alert(msg);
      }
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const updatedPost = await togglePublish(id);
      setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to update post status.";
      alert(msg);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-32">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
        <div>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-primary italic tracking-tighter text-shadow-neon uppercase">Dashboard</h1>
          <p className="text-text-muted font-bold uppercase tracking-[0.3em] text-sm mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Manage Posts
          </p>
        </div>

        <Link to="/posts/new" className="zzz-btn bg-primary text-black font-heading font-black px-8 py-4 uppercase tracking-widest skew-box hover:bg-white transition-all w-full sm:w-auto text-center">
          <span className="unskew-text">New Post</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-accent/10 border-2 border-accent p-6 text-center">
          <p className="text-accent font-bold uppercase tracking-widest">{error}</p>
          <button onClick={fetchPosts} className="mt-4 text-primary underline font-bold uppercase text-xs">
            Retry
          </button>
        </div>
      ) : (
        <PostTable posts={posts} onDelete={handleDelete} onTogglePublish={handleTogglePublish} />
      )}
    </div>
  );
};

export default DashboardPage;