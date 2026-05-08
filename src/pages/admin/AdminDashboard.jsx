import { posts } from '../../data/posts';
import { Eye, MessageSquare, TrendingUp, Users } from 'lucide-react';

const stats = [
  { label: 'Total Views', value: '45.2k', icon: Eye, trend: '+12.5%' },
  { label: 'Total Posts', value: posts.length, icon: TrendingUp, trend: '+2' },
  { label: 'Active Authors', value: '8', icon: Users, trend: '0' },
  { label: 'Comments', value: '312', icon: MessageSquare, trend: '+45' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-bold font-outfit uppercase tracking-tighter">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm">Welcome back, Jannat. Here's what's happening today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-black border border-slate-200 dark:border-slate-900 p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-sm">
                <stat.icon size={18} className="text-slate-900 dark:text-white" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                stat.trend.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-400'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold font-outfit">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-6">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Recent Activity</h2>
        <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-900 rounded-sm divide-y divide-slate-100 dark:divide-slate-900">
          {posts.slice(0, 4).map((post) => (
            <div key={post.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={post.coverImage} className="w-10 h-10 object-cover rounded-sm grayscale" alt="" />
                <div>
                  <p className="text-sm font-semibold">{post.title}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{post.category} · Just now</p>
                </div>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest hover:underline transition-all">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
