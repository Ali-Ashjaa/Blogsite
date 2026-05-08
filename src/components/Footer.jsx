import { Link } from 'react-router-dom';
import { PenLine, Send, Globe, Link as LinkIcon, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const footerLinks = {
  Platform: [
    { label: 'Home', to: '/' },
    { label: 'Categories', to: '/categories' },
    { label: 'Submit Article', to: '/submit' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  Categories: [
    { label: 'Technology', to: '/categories/technology' },
    { label: 'Lifestyle', to: '/categories/lifestyle' },
    { label: 'Education', to: '/categories/education' },
    { label: 'General', to: '/categories/general' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookies' },
  ],
};

const socials = [
  { icon: Send, label: 'Twitter', href: '#' },
  { icon: Globe, label: 'GitHub', href: '#' },
  { icon: LinkIcon, label: 'LinkedIn', href: '#' },
  { icon: Camera, label: 'Instagram', href: '#' },
];

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-white dark:bg-black text-slate-500 border-t border-slate-100 dark:border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-slate-900 dark:text-white font-bold text-lg mb-4 font-outfit uppercase tracking-tighter">
              WordWeaver<span className="text-slate-400">.</span>
            </Link>
            <p className="text-xs font-bold uppercase tracking-widest leading-loose max-w-xs text-slate-400">
              A stage for creators who refuse confinement. For those who feel the hunger to create, this is your home too.
            </p>
            <div className="flex gap-4 mt-8">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-slate-900 dark:text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6">{title}</h4>
              <ul className="space-y-4">
                {links.map((l) => (
                  <li key={l.label}>
                    {l.href ? (
                      <a 
                        href={l.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-medium hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link to={l.to} className="text-xs font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-50 dark:border-slate-900 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">© {new Date().getFullYear()} WordWeaver Magazine. All rights reserved.</p>
          <div className="flex gap-6">
             {user?.role === 'admin' && (
               <Link to="/admin" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white">Admin Panel</Link>
             )}
             {!user && (
               <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white">Login</Link>
             )}
             <Link to="/submit" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white">Submit Article</Link>
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 dark:text-slate-700">Restless & Relentless</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
