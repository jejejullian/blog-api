import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      login(data.token);
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.error || "Login failed. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full bg-surface border-2 border-border p-8 relative overflow-hidden group">
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-primary transform translate-x-6 -translate-y-6 rotate-45 group-hover:scale-150 transition-transform duration-500"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-heading font-black text-primary mb-2 text-shadow-neon uppercase italic tracking-tighter">Login</h2>
          <p className="text-text-muted text-sm mb-8 font-bold uppercase tracking-widest">Identity verification</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border-2 border-border focus:border-primary px-4 py-3 text-text-main outline-none transition-colors font-sans"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full bg-black/50 border-2 ${error ? "border-accent" : "border-border"} focus:border-primary px-4 py-3 text-text-main outline-none transition-colors font-sans`}
                placeholder="Password"
              />
              {error && <p className="text-accent text-[10px] font-bold uppercase tracking-wider mt-2 animate-pulse">⚠️ Error: {error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full zzz-btn bg-primary text-black font-heading font-black text-lg py-4 uppercase tracking-widest transform skewX(-6deg) hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="unskew-text">{loading ? "Loading..." : "Login"}</span>
            </button>
          </form>
        </div>

        {/* Technical readout decoration */}
        <div className="mt-8 pt-6 border-t border-border flex justify-between items-end opacity-30">
          <div className="text-[10px] font-mono leading-none">STATUS: RESTRICTED</div>
          <div className="text-[10px] font-mono leading-none text-right">AUTH_LEVEL: AUTHOR</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
