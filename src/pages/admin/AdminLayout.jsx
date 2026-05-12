import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, ExternalLink, Mail, Inbox } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { messagesDB, submissionsDB } from '../../lib/db';

const sidebarLinks = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'All Posts', to: '/admin/posts', icon: FileText },
  { label: 'Submissions', to: '/admin/submissions', icon: Inbox, badgeKey: 'submissions' },
  { label: 'Messages', to: '/admin/messages', icon: Mail, badgeKey: 'messages' },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [badges, setBadges] = useState({ submissions: 0, messages: 0 });

  useEffect(() => {
    setBadges({
      submissions: submissionsDB.pendingCount(),
      messages: messagesDB.unreadCount(),
    });
  }, [location.pathname]);

  if (user?.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-900 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-200 dark:border-slate-900 flex items-center justify-between">
          <Link to="/admin" className="font-bold text-sm tracking-tighter uppercase">
            WordWeaver <span className="text-slate-400">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.to;
            const badge = link.badgeKey ? badges[link.badgeKey] : 0;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  {link.label}
                </div>
                {badge > 0 && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                    active ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                  }`}>
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-900 space-y-1">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs font-bold truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
          >
            <ExternalLink size={18} />
            View Site
          </Link>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-left"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8 lg:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
