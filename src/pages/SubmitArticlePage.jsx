import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Send, Image as ImageIcon, FileText, CheckCircle } from 'lucide-react';
import { submissionsDB } from '../lib/db';
import { useSEO } from '../hooks/useSEO';

export default function SubmitArticlePage() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    excerpt: '',
    content: '',
    coverImage: '',
    authorBio: '',
    authorAvatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name || 'Guest'}`
  });

  useSEO({
    title: 'Submit an Article',
    description: 'Contribute to WordWeaver. Share your voice, stories, and perspectives with our growing community of readers.',
    keywords: 'submit article, contribute, write, blog, wordweaver',
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
    
    submissionsDB.add(submission);
    
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

        {/* Cover Image Upload */}
        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
            <ImageIcon size={14} /> Cover Image (Local Upload)
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
                    setFormData({...formData, coverImage: reader.result});
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="cover-upload"
            />
            <label 
              htmlFor="cover-upload"
              className="flex items-center justify-center w-full border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-sm py-12 hover:border-slate-900 dark:hover:border-white transition-all cursor-pointer bg-slate-50/50 dark:bg-slate-900/30"
            >
              <div className="text-center">
                <ImageIcon size={24} className="mx-auto mb-2 text-slate-300" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Click to upload or drag & drop</p>
                <p className="text-[8px] text-slate-400 mt-1 uppercase tracking-tighter">PNG, JPG up to 2MB</p>
              </div>
            </label>
          </div>
          
          {formData.coverImage && (
            <div className="mt-4 rounded-sm overflow-hidden border border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center justify-between p-2 border-b border-slate-100 dark:border-slate-900">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Selected Image Preview</p>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, coverImage: ''})}
                  className="text-[9px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
              <img 
                src={formData.coverImage} 
                alt="Preview" 
                className="w-full h-48 object-cover"
              />
            </div>
          )}
        </div>

        {/* Author Details Section */}
        <div className="border-t border-slate-100 dark:border-slate-900 pt-12 space-y-10">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-6">Author Profile Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Author Avatar</label>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
                    <img 
                      src={formData.authorAvatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({...formData, authorAvatar: reader.result});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label 
                      htmlFor="avatar-upload"
                      className="inline-block text-[9px] font-bold uppercase tracking-widest px-4 py-2 border border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-white transition-all cursor-pointer rounded-sm"
                    >
                      Change Avatar
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Author Bio</label>
                <input
                  type="text"
                  required
                  value={formData.authorBio}
                  onChange={(e) => setFormData({...formData, authorBio: e.target.value})}
                  className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all"
                  placeholder="Writer, thinker, and coffee enthusiast..."
                />
              </div>
            </div>
          </div>
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
