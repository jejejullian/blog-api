import { Link } from 'react-router-dom';

const PostTable = ({ posts, onDelete, onTogglePublish }) => {
  if (posts.length === 0) {
    return (
      <div className="border-2 border-dashed border-border p-20 text-center">
        <p className="text-text-muted font-heading font-bold uppercase tracking-widest">No posts found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border-2 border-border bg-surface/50 backdrop-blur-sm relative">
      {/* Decorative scanline effect background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.02),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]"></div>

      <table className="w-full text-left border-collapse relative z-10">
        <thead>
          <tr className="border-b-2 border-border bg-surface">
            <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-text-muted italic">ID</th>
            <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-text-muted italic">Title</th>
            <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-text-muted italic">Status</th>
            <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-text-muted italic text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-primary/5 transition-colors group">
              <td className="px-6 py-4">
                <span className="text-[10px] font-mono text-text-muted group-hover:text-primary transition-colors">
                  #{post.id.toString().padStart(4, '0')}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold uppercase tracking-tight text-text-main group-hover:text-primary transition-colors">
                    {post.title}
                  </span>
                  <span className="text-[10px] text-text-muted font-mono mt-1">
                    Updated: {new Date(post.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${post.published ? 'bg-primary shadow-[0_0_8px_#D2FF00]' : 'bg-text-muted'}`}></span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${post.published ? 'text-primary' : 'text-text-muted'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <button
                  onClick={() => onTogglePublish(post.id)}
                  className={`text-[10px] font-black px-3 py-1 uppercase tracking-widest border transition-all ${
                    post.published 
                    ? 'border-accent/50 text-accent hover:bg-accent hover:text-white' 
                    : 'border-primary/50 text-primary hover:bg-primary hover:text-black'
                  }`}
                >
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                
                <Link
                  to={`/posts/${post.id}/edit`}
                  className="text-[10px] font-black px-3 py-1 uppercase tracking-widest border border-border text-text-main hover:bg-white hover:text-black transition-all"
                >
                  Edit
                </Link>

                <button
                  onClick={() => onDelete(post.id)}
                  className="text-[10px] font-black px-3 py-1 uppercase tracking-widest border border-accent/20 text-accent/50 hover:bg-accent hover:text-white transition-all"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
