import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { posts, categories } from '../data/posts';

const recentPosts = [...posts].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 5);
const popularPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

export default function Sidebar() {
  return (
    <aside className="space-y-12">
      {/* Popular Posts */}
      <div className="">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Trending Stories</h3>
        <div className="space-y-6">
          {popularPosts.map((post, i) => (
            <div key={post.id} className="flex gap-4 items-start">
               <div className="min-w-0">
                <Link
                  to={`/post/${post.slug}`}
                  className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-500 dark:hover:text-slate-400 leading-tight transition-colors block mb-1"
                >
                  {post.title}
                </Link>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span>{post.readTime} min</span>
                  <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <span>{post.views.toLocaleString()} reads</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="border-t border-slate-100 dark:border-slate-900 pt-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Explore</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-slate-100 dark:border-slate-900 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white transition-all"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA (Minimal) */}
      <div className="border-t border-slate-100 dark:border-slate-900 pt-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Newsletter</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Get the latest stories delivered to your inbox weekly.</p>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all"
          />
          <button
            type="submit"
            className="w-full py-3 text-[10px] font-bold uppercase tracking-[0.2em] bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all rounded-sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
