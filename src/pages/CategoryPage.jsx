import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getCategoryById, getPostsByCategory } from '../data/posts';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

export default function CategoryPage() {
  const { id } = useParams();
  const category = getCategoryById(id);
  const posts = getPostsByCategory(id);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Category Not Found</h1>
        <Link to="/categories" className="text-blue-600 hover:underline">← Back to Categories</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/categories"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 mb-6 transition-colors">
        <ArrowLeft size={16} /> All Categories
      </Link>

      <div className="mb-8">
        <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full mb-3 ${category.color}`}>
          {category.name}
        </span>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{category.name} Articles</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{posts.length} article{posts.length !== 1 ? 's' : ''} found</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-5xl mb-3">📭</p>
              <p>No articles in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
