import { Link } from 'react-router-dom';
import { Clock, Eye, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { getAuthorById, getCategoryById } from '../data/posts';

export default function PostCard({ post, featured = false }) {
   const authorName = post.source === 'community' ? post.author : getAuthorById(post.authorId)?.name;
   const category = getCategoryById(post.category);

  return (
    <article
      className={`group flex flex-col gap-6 items-start pb-12 border-b border-slate-100 dark:border-slate-900 last:border-0 ${
        featured ? 'w-full' : 'md:flex-row'
      }`}
    >
      {/* Cover Image (Subtle) */}
      <div className={`relative shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-900 rounded-sm w-full ${featured ? 'aspect-video md:aspect-[16/9]' : 'md:w-48 aspect-[4/3] md:aspect-square'}`}>
        <img
          src={post.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80'}
          alt={post.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80';
          }}
        />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        {/* Category & Date */}
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">
          <span>{category?.name}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span>{format(new Date(post.publishDate), 'MMM d, yyyy')}</span>
        </div>

        {/* Title */}
        <h2 className={`font-bold text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors serif ${featured ? 'text-3xl' : 'text-xl'}`}>
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta Row */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
             <span className="flex items-center gap-1">
              {post.readTime} min
            </span>
            <span className="flex items-center gap-1 uppercase">
               {authorName}
            </span>
          </div>

          <Link
            to={`/post/${post.slug}`}
            className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white border-b border-transparent hover:border-slate-900 dark:hover:border-white transition-all"
          >
            Read Story
          </Link>
        </div>
      </div>
    </article>
  );
}
