import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { postsDB } from '../lib/db';
import PostCard from '../components/PostCard';

export default function SearchPage() {
  const [params] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = params.get('q') || '';

  useEffect(() => {
    if (query) {
      const q = query.toLowerCase();
      const all = postsDB.getAll();
      const filtered = all.filter(p => 
        p.status !== 'hidden' && (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        )
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Search size={24} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Search Results</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          {results.length} result{results.length !== 1 ? 's' : ''} for "<span className="font-medium text-slate-700 dark:text-slate-200">{query}</span>"
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No articles found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Try searching with different keywords.</p>
          <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Browse All Articles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}
