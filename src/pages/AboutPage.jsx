import { Link } from 'react-router-dom';
import { authors } from '../data/posts';
import { BookOpen, Users, Globe, Heart } from 'lucide-react';

const stats = [
  { icon: BookOpen, label: 'Articles Published', value: '30+' },
  { icon: Users, label: 'Active Authors', value: '4' },
  { icon: Globe, label: 'Monthly Readers', value: '12K+' },
  { icon: Heart, label: 'Comments', value: '500+' },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-outfit">About WordWeaver</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We're a community-driven platform where passionate writers share their knowledge and experiences across technology, lifestyle, education, and more.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-center hover:shadow-lg transition-shadow">
            <Icon size={28} className="text-blue-600 mx-auto mb-3" />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</p>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-blue-100 max-w-2xl mx-auto text-lg leading-relaxed">
          To democratize knowledge sharing by providing a clean, distraction-free platform where anyone can publish quality content and reach curious readers worldwide.
        </p>
      </section>

      {/* Authors */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">Meet Our Authors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((a) => (
            <Link
              key={a.id}
              to={`/author/${a.id}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <img src={a.avatar} alt={a.name}
                className="w-20 h-20 rounded-2xl mx-auto mb-4 bg-slate-100 dark:bg-slate-800 group-hover:ring-4 ring-blue-100 dark:ring-blue-900 transition-all" />
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{a.name}</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">{a.role}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{a.bio}</p>
              <p className="text-xs text-slate-400 mt-3">{a.posts} articles</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
