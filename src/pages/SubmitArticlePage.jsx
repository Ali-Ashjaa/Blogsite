import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Send, Image as ImageIcon, FileText, CheckCircle } from 'lucide-react';

export default function SubmitArticlePage() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    excerpt: '',
    content: '',
    coverImage: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = {
      ...formData,
      id: Date.now(),
      author: user.name,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    const existing = JSON.parse(localStorage.getItem('wordweaver_submissions') || '[]');
    localStorage.setItem('wordweaver_submissions', JSON.stringify([...existing, submission]));
    
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white mb-8">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-4xl font-bold font-outfit uppercase tracking-tighter mb-4">Submission Received.</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
          Your article has been sent to our editors. We will review your work and get back to you via email within 3-5 business days.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-[10px] font-bold uppercase tracking-[0.2em] px-10 py-4 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-all rounded-sm"
        >
          Submit Another Piece
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold font-outfit uppercase tracking-tighter mb-6 leading-tight">
          CONTRIBUTE TO <br />
          <span className="text-slate-300 dark:text-slate-800">THE JOURNAL.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
          We are always looking for fresh perspectives and untold stories. Share your voice with our community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Article Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-xl font-bold outline-none focus:border-slate-900 dark:focus:border-white transition-all font-outfit"
              placeholder="The Unspoken Rhythm..."
            />
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all appearance-none cursor-pointer"
            >
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        {/* Excerpt */}
        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Short Excerpt</label>
          <textarea
            required
            value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
            className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all resize-none h-20"
            placeholder="A brief summary of your piece (max 150 characters)..."
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Article Content</label>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <FileText size={12} /> Markdown Supported
            </span>
          </div>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-900 p-6 rounded-sm min-h-[400px] outline-none focus:border-slate-200 dark:focus:border-slate-800 transition-all text-base leading-relaxed"
            placeholder="Write your story here..."
          />
        </div>

        {/* Cover Image URL */}
        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
            <ImageIcon size={14} /> Cover Image URL (Unsplash or similar)
          </label>
          <input
            type="url"
            value={formData.coverImage}
            onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
            className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        {/* Action */}
        <div className="pt-10 flex flex-col items-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">
            By submitting, you agree to our terms of creation and content guidelines.
          </p>
          <button
            type="submit"
            className="group inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-all rounded-sm shadow-xl"
          >
            Submit for Review
            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
}
