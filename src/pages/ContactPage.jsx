import { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { messagesDB } from '../lib/db';
import { useSEO } from '../hooks/useSEO';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with WordWeaver. Have a question, feedback, or want to contribute? We respond within 24 hours.',
    keywords: 'contact, wordweaver, feedback, support, contribute',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = {
      ...form,
      id: Date.now(),
      read: false,
      submittedAt: new Date().toISOString()
    };
    messagesDB.add(message);

    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  if (sent) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white mb-8">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-4xl font-bold font-outfit uppercase tracking-tighter mb-4">Message Sent.</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
          Thank you for reaching out. Your query has been logged and our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-[10px] font-bold uppercase tracking-[0.2em] px-10 py-4 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-all rounded-sm"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-20 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] mb-8 font-outfit uppercase tracking-tighter">
          GET IN <br />
          <span className="text-slate-300 dark:text-slate-800">TOUCH.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed">
          Have a question, feedback, or want to contribute? We respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Communication</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-sm bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</p>
                  <p className="text-sm font-medium">hello@wordweaver.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-sm bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Location</p>
                  <p className="text-sm font-medium"> India </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t border-slate-100 dark:border-slate-900">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Restless & Relentless</h2>
            <p className="text-xs text-slate-500 leading-loose uppercase tracking-widest font-bold">
              A stage for creators who refuse confinement.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                <input required value={form.name} onChange={set('name')} placeholder="John Doe" className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Email Address</label>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Subject</label>
              <input value={form.subject} onChange={set('subject')} placeholder="How can we help?" className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Message</label>
              <textarea required rows={6} value={form.message} onChange={set('message')} placeholder="Your message here..." className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all resize-none" />
            </div>
            <button type="submit"
              className="px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-all rounded-sm flex items-center gap-3">
              <Send size={14} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
