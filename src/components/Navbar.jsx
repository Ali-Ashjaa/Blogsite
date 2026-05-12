import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Search, Menu, X, PenLine, LogIn, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { settingsDB } from '../lib/db';

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [settings, setSettings] = useState(settingsDB.get());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Re-sync settings when location changes (simple way to catch updates)
    setSettings(settingsDB.get());
  }, [location]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Categories', to: '/categories' },
    ...(settings.allowSubmissions ? [{ label: 'Submit Article', to: '/submit' }] : []),
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setSearchOpen(false);
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white group">
            <span className="tracking-tighter font-outfit uppercase">{settings.siteName}<span className="text-slate-400">.</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((l) => (
              l.href ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    location.pathname === l.to
                      ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              )
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 border-b border-transparent focus-within:border-slate-300 dark:focus-within:border-slate-700 transition-all">
              <Search size={14} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-32 focus:w-48 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400 py-1"
              />
            </form>

            <div className="flex items-center gap-1">
              {/* Dark mode toggle */}
              <button
                onClick={toggle}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Admin Link (Only if admin) */}
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  title="Admin Panel"
                >
                  <PenLine size={16} />
                </Link>
              )}

              {/* Login/Logout */}
              {user ? (
                <button
                  onClick={logout}
                  className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  title="Login"
                >
                  <LogIn size={16} />
                </Link>
              )}

              {/* Mobile search icon */}
              <button
                className="md:hidden p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                onClick={() => setSearchOpen((s) => !s)}
              >
                <Search size={16} />
              </button>

              {/* Hamburger */}
              <button
                className="md:hidden p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                onClick={() => setOpen((o) => !o)}
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2">
              <Search size={14} className="text-slate-400" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="bg-transparent outline-none text-sm flex-1 text-slate-800 dark:text-slate-200 placeholder-slate-400"
              />
            </div>
          </form>
        )}

        {/* Mobile Nav */}
        {open && (
          <nav className="md:hidden pb-4 border-t border-slate-100 dark:border-slate-900 mt-2 pt-2">
            {navLinks.map((l) => (
              l.href ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1 ${
                    location.pathname === l.to
                      ? 'bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  {l.label}
                </Link>
              )
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
