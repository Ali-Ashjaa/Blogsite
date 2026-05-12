import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Mail, Trash2, Eye, CheckCircle, Inbox } from 'lucide-react';
import { messagesDB } from '../../lib/db';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setMessages(messagesDB.getAll());
  }, []);

  const handleRead = (msg) => {
    setSelected(msg);
    if (!msg.read) {
      const updated = messagesDB.markRead(msg.id);
      setMessages(updated);
    }
  };

  const handleDelete = (id) => {
    const updated = messagesDB.delete(id);
    setMessages(updated);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-outfit uppercase tracking-tighter">Contact Messages</h1>
        <p className="text-slate-500 text-sm">
          Messages sent via the Contact page.{' '}
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {messages.filter((m) => !m.read).length} unread
          </span>
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 bg-white dark:bg-black border border-slate-200 dark:border-slate-900 rounded-sm">
          <Inbox size={40} className="mb-4 opacity-30" />
          <p className="text-sm font-bold uppercase tracking-widest">No messages yet</p>
          <p className="text-xs mt-1">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Message List */}
          <div className="lg:col-span-2 bg-white dark:bg-black border border-slate-200 dark:border-slate-900 rounded-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-900">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {messages.length} Total Messages
              </p>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-900 max-h-[600px] overflow-y-auto">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleRead(msg)}
                  className={`w-full text-left p-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50 ${
                    selected?.id === msg.id ? 'bg-slate-50 dark:bg-slate-900/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                      )}
                      <div className="min-w-0">
                        <p className={`text-sm truncate ${!msg.read ? 'font-bold' : 'font-medium'}`}>
                          {msg.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">{msg.email}</p>
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-400 whitespace-nowrap flex-shrink-0">
                      {format(new Date(msg.submittedAt), 'MMM d')}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 truncate">
                    {msg.subject || '(No subject)'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-3 bg-white dark:bg-black border border-slate-200 dark:border-slate-900 rounded-sm">
            {selected ? (
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-slate-100 dark:border-slate-900 flex items-start justify-between">
                  <div>
                    <h2 className="font-bold text-lg">{selected.subject || '(No Subject)'}</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      From{' '}
                      <span className="font-bold text-slate-600 dark:text-slate-300">{selected.name}</span>
                      {' '}·{' '}
                      <a href={`mailto:${selected.email}`} className="underline hover:text-slate-900 dark:hover:text-white">
                        {selected.email}
                      </a>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">
                      {format(new Date(selected.submittedAt), 'MMMM d, yyyy · h:mm a')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-6 flex-1">
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
                <div className="p-6 border-t border-slate-100 dark:border-slate-900">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || '')}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-all"
                  >
                    <Mail size={14} />
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Eye size={32} className="mb-3 opacity-30" />
                <p className="text-xs font-bold uppercase tracking-widest">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
