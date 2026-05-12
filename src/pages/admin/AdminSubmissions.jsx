import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Check, X, Eye, Trash2, Inbox, ChevronDown } from 'lucide-react';
import { submissionsDB, postsDB } from '../../lib/db';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => { setSubmissions(submissionsDB.getAll()); }, []);

  const handleStatus = (id, status) => {
    const sub = submissions.find(s => s.id === id);
    if (!sub || sub.status !== 'pending') return; // Prevent changing processed submissions

    const updated = submissionsDB.updateStatus(id, status);
    setSubmissions(updated);
    
    if (status === 'approved') {
      const sub = updated.find(s => s.id === id);
      if (sub) {
        postsDB.add({
          id: Date.now(),
          slug: sub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          title: sub.title,
          category: sub.category,
          excerpt: sub.excerpt,
          content: sub.content,
          coverImage: sub.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', // Fallback
          author: sub.author,
          authorBio: sub.authorBio,
          authorAvatar: sub.authorAvatar,
          publishDate: new Date().toISOString(),
          readTime: `${Math.max(1, Math.ceil((sub.content || '').split(/\s+/).length / 200))} min read`,
          status: 'published',
          source: 'community'
        });
      }
    }
  };

  const handleDelete = (id) => { setSubmissions(submissionsDB.delete(id)); if (expanded === id) setExpanded(null); };

  const filtered = filter === 'all' ? submissions : submissions.filter(s => s.status === filter);
  const pendingCount = submissions.filter(s => s.status === 'pending').length;

  const statusBadge = (status) => {
    const cls = status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
      : status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
      : 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400';
    return <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${cls}`}>{status}</span>;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-outfit uppercase tracking-tighter mb-2">Article Submissions</h1>
        <p className="text-slate-500 text-sm">Review community articles. <span className="font-bold text-amber-600 dark:text-amber-400">{pendingCount} pending</span></p>
      </div>

      <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-sm w-fit">
        {['all','pending','approved','rejected'].map(v => (
          <button key={v} onClick={() => setFilter(v)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all ${filter === v ? 'bg-white dark:bg-black text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
            {v}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-900 rounded-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center"><Inbox size={32} className="mx-auto mb-3 text-slate-300" /><p className="text-slate-400 text-sm">No submissions found.</p></div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-900">
            {filtered.map(sub => (
              <div key={sub.id}>
                <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                  <div className="flex items-center gap-6 min-w-0 flex-1">
                    <div className="min-w-[100px]"><p className="text-sm font-bold uppercase tracking-tighter">{sub.author}</p></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{sub.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{sub.category}</p>
                    </div>
                    <p className="text-xs text-slate-500 font-mono hidden md:block">{format(new Date(sub.submittedAt), 'MMM dd, HH:mm')}</p>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <button onClick={() => setExpanded(expanded === sub.id ? null : sub.id)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="View">
                      <ChevronDown size={16} className={`transition-transform ${expanded === sub.id ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {sub.status === 'pending' ? (
                      <div className="flex gap-1">
                        <button onClick={() => handleStatus(sub.id, 'approved')} className="p-2 text-slate-400 hover:text-emerald-600 transition-colors" title="Approve"><Check size={16} /></button>
                        <button onClick={() => handleStatus(sub.id, 'rejected')} className="p-2 text-slate-400 hover:text-red-600 transition-colors" title="Reject"><X size={16} /></button>
                        <button onClick={() => handleDelete(sub.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        {statusBadge(sub.status)}
                        <button onClick={() => handleDelete(sub.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    )}
                  </div>
                </div>
                {expanded === sub.id && (
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-t border-slate-100 dark:border-slate-900 space-y-4">
                    <div><p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Excerpt</p><p className="text-sm text-slate-600 dark:text-slate-400">{sub.excerpt || '—'}</p></div>
                    <div><p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Content</p><div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">{sub.content || '—'}</div></div>
                    {sub.coverImage && <div><p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Cover</p><img src={sub.coverImage} alt="" className="h-32 rounded-sm object-cover" /></div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
