import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Eye } from 'lucide-react';
import { getAuthorById } from '../data/posts';
import { postsDB } from '../lib/db';
import PostCard from '../components/PostCard';

export default function AuthorPage() {
  const { id } = useParams();
  const [authorPosts, setAuthorPosts] = useState([]);
  const author = getAuthorById(Number(id));

  useEffect(() => {
    const all = postsDB.getAll();
    const filtered = all.filter(p => p.authorId === Number(id) && p.status !== 'hidden');
    setAuthorPosts(filtered);
  }, [id]);

  const totalViews = authorPosts.reduce((sum, p) => sum + (p.views || 0), 0);

  if (!author) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">👤</p>
        <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Author Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      {/* Author Profile Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white mb-10 flex flex-col md:flex-row items-center gap-8">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-28 h-28 rounded-3xl bg-white/20 shrink-0 ring-4 ring-white/30"
        />
        <div className="text-center md:text-left">
          <span className="inline-block text-xs font-semibold bg-white/20 px-3 py-1 rounded-full mb-3">
            {author.role}
          </span>
          <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
          <p className="text-blue-100 max-w-lg leading-relaxed mb-5">{author.bio}</p>
          <div className="flex gap-6 justify-center md:justify-start">
            <div className="text-center">
              <p className="text-2xl font-bold">{authorPosts.length}</p>
              <p className="text-blue-200 text-xs flex items-center gap-1 mt-0.5"><BookOpen size={12} /> Articles</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              <p className="text-blue-200 text-xs flex items-center gap-1 mt-0.5"><Eye size={12} /> Total Views</p>
            </div>
          </div>
        </div>
      </div>

      {/* Author's Posts */}
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Articles by {author.name}
      </h2>
      {authorPosts.length === 0 ? (
        <p className="text-slate-400 text-center py-12">No articles published yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}
