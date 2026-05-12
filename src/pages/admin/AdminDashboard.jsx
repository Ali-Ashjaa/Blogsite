import { useState, useEffect } from 'react';
import { posts } from '../../data/posts';
import { Eye, MessageSquare, TrendingUp, Users, FileText, Mail } from 'lucide-react';
import { submissionsDB, messagesDB, usersDB, postsDB } from '../../lib/db';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const customPosts = postsDB.getAll();
    const totalPosts = posts.length + customPosts.length;
    setStats([
      { label: 'Total Posts', value: totalPosts, icon: TrendingUp, trend: `+${customPosts.length}` },
      { label: 'Submissions', value: submissionsDB.count(), icon: FileText, trend: `${submissionsDB.pendingCount()} pending`, color: submissionsDB.pendingCount() > 0 },
      { label: 'Messages', value: messagesDB.count(), icon: Mail, trend: `${messagesDB.unreadCount()} unread`, color: messagesDB.unreadCount() > 0 },
      { label: 'Users', value: usersDB.count(), icon: Users, trend: '+0' },
    ]);
  }, []);

  const recentPosts = posts.slice(0, 4);

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-bold font-outfit uppercase tracking-tighter">Dashboard &nbsp; Overview</h1>
        <p className="text-slate-500 text-sm">Welcome back, Waqar. Here's what's happening.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-black border border-slate-200 dark:border-slate-900 p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-sm">
                <stat.icon size={18} className="text-slate-900 dark:text-white" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.color ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' :
                stat.trend.startsWith('+') && stat.trend !== '+0' ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' :
                  'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-400'
                }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold font-outfit">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Recent Posts</h2>
            <Link to="/admin/posts" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">View All →</Link>
          </div>
          <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-900 rounded-sm divide-y divide-slate-100 dark:divide-slate-900">
            {recentPosts.map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={post.coverImage} className="w-10 h-10 object-cover rounded-sm grayscale" alt="" />
                  <div>
                    <p className="text-sm font-semibold">{post.title}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{post.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Manage Posts', desc: 'Create, edit, and delete posts', to: '/admin/posts', icon: FileText },
              { label: 'Review Submissions', desc: 'Approve or reject community articles', to: '/admin/submissions', icon: TrendingUp },
              { label: 'View Messages', desc: 'Read contact form messages', to: '/admin/messages', icon: Mail },
            ].map((action) => (
              <Link key={action.to} to={action.to} className="bg-white dark:bg-black border border-slate-200 dark:border-slate-900 p-4 rounded-sm flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group">
                <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-sm group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors">
                  <action.icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold">{action.label}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
