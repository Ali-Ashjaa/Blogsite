import { useState, useEffect } from 'react';
import { Save, CheckCircle, Globe, Mail, Settings, Shield, Layout, Search } from 'lucide-react';
import { settingsDB, usersDB } from '../../lib/db';

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-900 rounded-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 dark:border-slate-900 flex items-center gap-3">
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-sm">
          <Icon size={16} className="text-slate-600 dark:text-slate-400" />
        </div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">{title}</h2>
      </div>
      <div className="p-6 space-y-6">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</label>
      {children}
      {hint && <p className="text-[10px] text-slate-400">{hint}</p>}
    </div>
  );
}

const inputClass =
  'w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all';

const toggleClass = (checked) =>
  `relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
    checked ? 'bg-slate-900 dark:bg-white' : 'bg-slate-200 dark:bg-slate-700'
  }`;

export default function AdminSettings() {
  const [settings, setSettings] = useState(settingsDB.get());
  const [saved, setSaved] = useState(false);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    setUserCount(usersDB.count());
  }, []);

  const set = (key) => (e) => setSettings((s) => ({ ...s, [key]: e.target.value }));
  const toggle = (key) => () => setSettings((s) => ({ ...s, [key]: !s[key] }));

  const handleSave = (e) => {
    e.preventDefault();
    settingsDB.update(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-outfit uppercase tracking-tighter">Site Settings</h1>
          <p className="text-slate-500 text-sm">Configure your WordWeaver platform.</p>
        </div>
        <button
          type="submit"
          className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:opacity-90'
          }`}
        >
          {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* General */}
      <Section title="General" icon={Layout}>
        <Field label="Site Name" hint="Displayed in the browser tab and header.">
          <input value={settings.siteName} onChange={set('siteName')} className={inputClass} />
        </Field>
        <Field label="Tagline" hint="Short phrase shown under the site name.">
          <input value={settings.tagline} onChange={set('tagline')} className={inputClass} />
        </Field>
        <Field label="Posts Per Page">
          <input
            type="number"
            min="3"
            max="30"
            value={settings.postsPerPage}
            onChange={set('postsPerPage')}
            className={inputClass}
          />
        </Field>
      </Section>

      {/* SEO */}
      <Section title="SEO & Discoverability" icon={Search}>
        <Field label="Meta Description" hint="Shown in Google search results (max 160 chars).">
          <textarea
            value={settings.seoDescription}
            onChange={set('seoDescription')}
            rows={3}
            maxLength={160}
            className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-sm outline-none focus:border-slate-900 dark:focus:border-white transition-all resize-none"
          />
          <p className="text-[10px] text-slate-400 text-right">
            {settings.seoDescription?.length || 0}/160
          </p>
        </Field>
        <Field label="Keywords" hint="Comma-separated keywords for search engines.">
          <input value={settings.seoKeywords} onChange={set('seoKeywords')} className={inputClass} />
        </Field>
        <Field label="Twitter Handle" hint="e.g. @wordweaver — used in Twitter Card meta tags.">
          <input value={settings.twitterHandle} onChange={set('twitterHandle')} className={inputClass} />
        </Field>
      </Section>

      {/* Email */}
      <Section title="Email & Contact" icon={Mail}>
        <Field label="Admin Email" hint="Used for internal notifications.">
          <input type="email" value={settings.adminEmail} onChange={set('adminEmail')} className={inputClass} />
        </Field>
        <Field label="Public Contact Email" hint="Shown on the Contact page.">
          <input type="email" value={settings.contactEmail} onChange={set('contactEmail')} className={inputClass} />
        </Field>
      </Section>

      {/* Access */}
      <Section title="Access Control" icon={Shield}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Allow New Signups</p>
              <p className="text-[10px] text-slate-400 mt-0.5">When disabled, the signup tab is hidden.</p>
            </div>
            <button type="button" onClick={toggle('allowSignups')} className={toggleClass(settings.allowSignups)}>
              <span
                className={`inline-block h-4 w-4 rounded-full transition-transform ${
                  settings.allowSignups
                    ? 'translate-x-6 bg-white dark:bg-black'
                    : 'translate-x-1 bg-white dark:bg-slate-400'
                }`}
              />
            </button>
          </div>
          <div className="h-px bg-slate-100 dark:bg-slate-900" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Allow Article Submissions</p>
              <p className="text-[10px] text-slate-400 mt-0.5">When disabled, the Submit page is hidden.</p>
            </div>
            <button type="button" onClick={toggle('allowSubmissions')} className={toggleClass(settings.allowSubmissions)}>
              <span
                className={`inline-block h-4 w-4 rounded-full transition-transform ${
                  settings.allowSubmissions
                    ? 'translate-x-6 bg-white dark:bg-black'
                    : 'translate-x-1 bg-white dark:bg-slate-400'
                }`}
              />
            </button>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-900 rounded-sm p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Platform Stats</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Registered Users', value: userCount },
            { label: 'Last Updated', value: settings.updatedAt ? new Date(settings.updatedAt).toLocaleDateString() : 'Never' },
            { label: 'Platform', value: 'WordWeaver v1.0' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-sm font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
