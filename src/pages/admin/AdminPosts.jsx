import { posts } from '../../data/posts';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminPosts() {
  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-outfit uppercase tracking-tighter">All Posts</h1>
          <p className="text-slate-500 text-sm">Manage and curate your journal entries.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all">
          <Plus size={14} />
          Create New
        </button>
      </header>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white dark:bg-black border border-slate-200 dark:border-slate-900 p-2 rounded-sm">
        <div className="flex-1 flex items-center gap-3 px-3">
          <Search size={16} className="text-slate-400" />
          <input
            placeholder="Search posts..."
            className="bg-transparent outline-none text-sm w-full py-2"
          />
        </div>
        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
        <select className="bg-transparent text-xs font-bold uppercase tracking-widest px-4 outline-none">
          <option>All Categories</option>
          <option>Society</option>
          <option>Culture</option>
        </select>
      </div>

      {/* Posts Table */}
      <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-900 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-900">
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Post Title</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Author</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img src={post.coverImage} className="w-12 h-12 object-cover rounded-sm grayscale" alt="" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate max-w-[300px]">{post.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{post.category}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                   Jannat Hussain
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-widest bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400">
                    Published
                  </span>
                </td>
                <td className="p-4 text-xs font-medium text-slate-500">
                  {format(new Date(post.publishDate), 'MMM d, yyyy')}
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
