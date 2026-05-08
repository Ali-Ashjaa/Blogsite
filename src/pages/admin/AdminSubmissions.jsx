import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Check, X, Eye, FileText, Clock } from 'lucide-react';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wordweaver_submissions') || '[]');
    setSubmissions(data.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
  }, []);

  const handleStatus = (id, status) => {
    const updated = submissions.map(s => s.id === id ? { ...s, status } : s);
    setSubmissions(updated);
    localStorage.setItem('wordweaver_submissions', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-outfit uppercase tracking-tighter mb-2">Article Submissions</h1>
        <p className="text-slate-500 text-sm">Review and manage articles submitted by the community.</p>
      </div>

      <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-900 rounded-sm overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-900">
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Contributor</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Article Title</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-12 text-center text-slate-400 text-sm italic">
                  No submissions pending review.
                </td>
              </tr>
            ) : (
              submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                  <td className="p-4">
                    <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tighter">{sub.author}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{sub.title}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{sub.category}</div>
                  </td>
                  <td className="p-4 text-xs text-slate-500 font-mono">
                    {format(new Date(sub.submittedAt), 'MMM dd, HH:mm')}
                  </td>
                  <td className="p-4">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${
                      sub.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' :
                      sub.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' :
                      'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="View Draft">
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleStatus(sub.id, 'approved')}
                        className="p-2 text-slate-400 hover:text-emerald-600 transition-colors" 
                        title="Approve"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => handleStatus(sub.id, 'rejected')}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors" 
                        title="Reject"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
