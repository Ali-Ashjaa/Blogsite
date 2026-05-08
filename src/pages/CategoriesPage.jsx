import { Link } from 'react-router-dom';
import { categories, posts } from '../data/posts';

const icons = {
  technology: '💻', lifestyle: '🌿', education: '📚',
  general: '🌐', health: '💪', finance: '💰',
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">Browse Categories</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Explore our curated collection of topics. Find the subjects that interest you most.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {categories.map((cat) => {
          const catPosts = posts.filter((p) => p.category === cat.id);
          return (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{icons[cat.id] || '📝'}</div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cat.name}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{cat.count} articles published</p>
              <div className="flex flex-wrap gap-2">
                {catPosts.slice(0, 2).map((p) => (
                  <span key={p.id} className={`text-xs px-2.5 py-1 rounded-full font-medium ${cat.color}`}>
                    {p.title.slice(0, 28)}…
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
