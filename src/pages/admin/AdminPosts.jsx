import { useState, useEffect } from 'react';
import { postsDB } from '../../lib/db';
import { Plus, Search, X, Send, Trash2, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';

function CreatePostModal({ open, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    excerpt: '',
    content: '',
    coverImage: '',
    author: 'Admin',
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newPost = {
      id: Date.now(),
      slug,
      ...formData,
      publishDate: new Date().toISOString(),
      readTime: `${Math.max(1, Math.ceil(formData.content.split(/\s+/).length / 200))} min read`,
      status: 'published',
      source: 'admin',
    };

    postsDB.add(newPost);
    onCreated(newPost);
    setFormData({ title: '', category: 'General', excerpt: '', content: '', coverImage: '', author: 'Admin' });
    onClose();
  };

  const inputClass =
    'w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-900 sticky top-0 bg-white dark:bg-black z-10">
          <h2 className="text-lg font-bold font-outfit uppercase tracking-tighter">Create New Post</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Post Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={inputClass}
                placeholder="Your Post Title..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
                <option value="Society">Society</option>
                <option value="Culture">Culture</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Author Name</label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className={inputClass}
              placeholder="Author Name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Excerpt</label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className={`${inputClass} resize-none h-20`}
              placeholder="Brief summary of this post..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Content</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-900 p-4 rounded-sm min-h-[200px] outline-none focus:border-slate-200 dark:focus:border-slate-800 transition-all text-sm leading-relaxed"
              placeholder="Write your post content here..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <ImageIcon size={14} />
              Cover Image (Local Upload)
            </label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({ ...formData, coverImage: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="admin-cover-upload"
              />
              <label 
                htmlFor="admin-cover-upload"
                className="flex items-center justify-center w-full border border-dashed border-slate-200 dark:border-slate-800 rounded-sm py-8 hover:border-slate-900 dark:hover:border-white transition-all cursor-pointer bg-slate-50/50 dark:bg-slate-900/30"
              >
                <div className="text-center">
                  <ImageIcon size={20} className="mx-auto mb-2 text-slate-300" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Upload Image</p>
                </div>
              </label>
            </div>
            {formData.coverImage && (
              <div className="mt-3 rounded-sm overflow-hidden border border-slate-100 dark:border-slate-900 relative group">
                <img 
                  src={formData.coverImage} 
                  alt="Preview" 
                  className="w-full h-40 object-cover" 
                />
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, coverImage: '' })}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-900">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all"
            >
              <Send size={14} />
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPosts() {
  const [showCreate, setShowCreate] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    setAllPosts(postsDB.getAll());
  }, []);

  // Filter
  const filtered = allPosts.filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const categories = [...new Set(allPosts.map((p) => p.category))];

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updated = postsDB.delete(postId);
      setAllPosts(updated);
    }
  };

  const handleToggleStatus = (postId) => {
    const updated = postsDB.toggleStatus(postId);
    setAllPosts(updated);
  };

  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-outfit uppercase tracking-tighter">All Posts</h1>
          <p className="text-slate-500 text-sm">Manage and curate your journal entries. {allPosts.length} total posts.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all"
        >
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full py-2"
          />
        </div>
        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-transparent text-xs font-bold uppercase tracking-widest px-4 outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
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
            {filtered.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    {post.coverImage ? (
                      <img 
                        src={post.coverImage} 
                        className="w-12 h-12 object-cover rounded-sm" 
                        alt="" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-sm flex items-center justify-center text-slate-400">
                        <ImageIcon size={16} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate max-w-[300px]">{post.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{post.category}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                  {post.author || 'Jannat Hussain'}
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-widest w-fit ${
                        post.status === 'hidden'
                          ? 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                          : 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                      }`}
                    >
                      {post.status || 'Published'}
                    </span>
                    <span className="text-[7px] text-slate-400 uppercase font-bold tracking-widest">
                      {post.source === 'admin' ? 'Admin Post' : 'Community'}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-xs font-medium text-slate-500">
                  {format(new Date(post.publishDate), 'MMM d, yyyy')}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleToggleStatus(post.id)}
                      className={`p-2 rounded-full transition-colors ${
                        post.status === 'hidden'
                          ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20'
                          : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={post.status === 'hidden' ? 'Show Post' : 'Hide Post'}
                    >
                      {post.status === 'hidden' ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-600 rounded-full transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={(p) => setAllPosts((prev) => [p, ...prev])}
      />
    </div>
  );
}
