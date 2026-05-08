import { useState } from 'react';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import { posts, categories } from '../data/posts';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const POSTS_PER_PAGE = 6;

export default function HomePage() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = selectedCat === 'all'
    ? posts
    : posts.filter((p) => p.category === selectedCat);

  const featured = posts.filter((p) => p.featured).slice(0, 2);
  const paged = filtered.slice(0, page * POSTS_PER_PAGE);
  const hasMore = paged.length < filtered.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Intro Section */}
      <section className="mb-24 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] mb-8 font-outfit uppercase tracking-tighter">
          WORDWEAVER <br />
          <span className="text-slate-300 dark:text-slate-800">RESTLESS & RELENTLESS.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed mb-10 max-w-2xl">
          WordWeaver is a stage for creators who refuse confinement. We aim to grow from the urge to bring forth the unsaid, and give it a voice that can’t ever be silenced.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link
            to="/categories"
            className="text-xs font-bold uppercase tracking-widest border-b-2 border-slate-900 dark:border-white pb-1 hover:text-slate-500 dark:hover:text-slate-400 hover:border-slate-500 transition-all"
          >
            Explore Journal
          </Link>
          <Link
            to="/about"
            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            Our Story
          </Link>
        </div>
      </section>

      {/* Featured Section (Minimal) */}
      {featured.length > 0 && (
        <section className="mb-24 border-t border-slate-100 dark:border-slate-900 pt-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Selected Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {featured.map((post) => (
              <PostCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Main Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          {/* Category Filter Tabs */}
          <div className="flex gap-6 flex-wrap mb-16 overflow-x-auto pb-4 scrollbar-hide border-b border-slate-50 dark:border-slate-900">
            <button
              onClick={() => { setSelectedCat('all'); setPage(1); }}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                selectedCat === 'all'
                  ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-2'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              All Entries
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCat(cat.id); setPage(1); }}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                  selectedCat === cat.id
                    ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-2'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {paged.length === 0 ? (
            <div className="text-center py-32 border border-dashed border-slate-200 dark:border-slate-800 rounded-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Silence in the archives.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-20">
              {paged.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-24">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="text-[10px] font-bold uppercase tracking-[0.3em] px-12 py-5 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-all rounded-sm"
              >
                Continue Reading
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
