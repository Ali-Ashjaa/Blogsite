import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenLine, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      if (login(email, password)) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials.');
      }
    } else {
      if (!name) {
        setError('Name is required.');
        return;
      }
      const res = signup(name, email, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-black border border-slate-200 dark:border-slate-900 p-8 lg:p-12 rounded-sm shadow-sm transition-all duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-slate-900 dark:bg-white text-white dark:text-black mb-6">
            <PenLine size={24} />
          </div>
          <h1 className="text-2xl font-bold font-outfit uppercase tracking-tighter">
            {isLogin ? 'WordWeaver Access' : 'Create Account'}
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin ? 'Enter your credentials to continue.' : 'Join our community of creators.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3 rounded-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all"
              placeholder="admin@wordweaver.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all rounded-sm flex items-center justify-center gap-2"
          >
            {isLogin ? 'Authenticate' : 'Register'}
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>

        <p className="text-center mt-8 text-[10px] text-slate-300 dark:text-slate-700 font-bold uppercase tracking-widest">
          Restless & Relentless
        </p>
      </div>
    </div>
  );
}
