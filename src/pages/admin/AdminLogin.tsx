import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useAdmin } from "@/hooks/useAdmin";

interface AdminLoginProps {
  onSuccess: () => void;
}

const AdminLogin = ({ onSuccess }: AdminLoginProps) => {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(password);
      onSuccess();
    } catch {
      setError("Incorrect password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <img src={logoImg} alt="Logo" className="h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-white text-2xl font-serif mb-1">Admin Panel</h1>
          <p className="text-white/30 text-xs uppercase tracking-widest">Restricted Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
              <Lock size={14} />
            </div>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 pl-10 pr-10 py-3 text-sm rounded-lg focus:outline-none focus:border-white/30 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
            >
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg text-sm disabled:opacity-40 transition-opacity"
          >
            {loading ? "Authenticating..." : "Access Panel"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
