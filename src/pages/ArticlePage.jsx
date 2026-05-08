import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Eye, Calendar, ArrowLeft, Share2, Send, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  getPostBySlug, getAuthorById, getCategoryById,
  getRelatedPosts, comments as allComments, posts
} from '../data/posts';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';

function ShareButtons({ title, url }) {
  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const whatsapp = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
        <Share2 size={14} /> Share:
      </span>
      <a href={tweet} target="_blank" rel="noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 text-white rounded-lg text-xs font-medium hover:bg-sky-600 transition-colors">
        <Send size={12} /> Twitter
      </a>
      <a href={linkedin} target="_blank" rel="noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-medium hover:bg-blue-800 transition-colors">
        <LinkIcon size={12} /> LinkedIn
      </a>
      <a href={whatsapp} target="_blank" rel="noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
        📱 WhatsApp
      </a>
    </div>
  );
}

function CommentForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', text: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const handle = (e) => {
    e.preventDefault();
    if (form.name && form.text) { onSubmit(form); setForm({ name: '', email: '', text: '' }); }
  };
  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 transition";
  return (
    <form onSubmit={handle} className="space-y-4">
      <h4 className="font-semibold text-slate-900 dark:text-white">Leave a Comment</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required placeholder="Your name *" value={form.name} onChange={set('name')} className={inputCls} />
        <input type="email" placeholder="Email (optional)" value={form.email} onChange={set('email')} className={inputCls} />
      </div>
      <textarea required rows={4} placeholder="Write your thoughts..." value={form.text} onChange={set('text')} className={inputCls + " resize-none"} />
      <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
        Post Comment
      </button>
    </form>
  );
}

// Very simple markdown-like renderer for our post content
function ArticleBody({ content }) {
  const lines = content.trim().split('\n');
  const elements = [];
  let i = 0;
  let codeBuffer = [];
  let inCode = false;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      if (inCode) {
        elements.push(
          <pre key={i} className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 overflow-x-auto text-sm font-mono my-4 text-slate-800 dark:text-slate-200">
            <code>{codeBuffer.join('\n')}</code>
          </pre>
        );
        codeBuffer = [];
        inCode = false;
      } else { inCode = true; }
    } else if (inCode) {
      codeBuffer.push(line);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('#### ')) {
      elements.push(<h4 key={i} className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">{line.slice(5)}</h4>);
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 text-slate-700 dark:text-slate-300 italic rounded-r-xl text-sm">
          {line.slice(2)}
        </blockquote>
      );
    } else if (/^[-*] /.test(line)) {
      const items = [line];
      while (i + 1 < lines.length && /^[-*] /.test(lines[i + 1])) { i++; items.push(lines[i]); }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1 my-3 text-slate-700 dark:text-slate-300 text-base">
          {items.map((it, j) => <li key={j}>{it.slice(2)}</li>)}
        </ul>
      );
    } else if (/^\d+\. /.test(line)) {
      const items = [line];
      while (i + 1 < lines.length && /^\d+\. /.test(lines[i + 1])) { i++; items.push(lines[i]); }
      elements.push(
        <ol key={i} className="list-decimal list-inside space-y-1 my-3 text-slate-700 dark:text-slate-300 text-base">
          {items.map((it, j) => <li key={j}>{it.replace(/^\d+\. /, '')}</li>)}
        </ol>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className="font-semibold text-slate-800 dark:text-slate-200 my-2">{line.slice(2, -2)}</p>);
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      // Inline: bold, inline code
      const parsed = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-blue-600 dark:text-blue-400">$1</code>');
      elements.push(
        <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3 text-base"
          dangerouslySetInnerHTML={{ __html: parsed }} />
      );
    }
    i++;
  }
  return <div className="prose-custom">{elements}</div>;
}

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  const [views, setViews] = useState(post?.views ?? 0);
  const [localComments, setLocalComments] = useState(allComments[post?.id] || []);

  useEffect(() => {
    if (!post) return;
    const key = `views_${post.id}`;
    const stored = parseInt(localStorage.getItem(key) || '0');
    const newCount = stored + 1;
    localStorage.setItem(key, newCount);
    setViews(post.views + newCount);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4">404</p>
        <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Post Not Found</h1>
        <p className="text-slate-500 mb-6">This article doesn't exist or was removed.</p>
        <button onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
          Go Home
        </button>
      </div>
    );
  }

  const author = getAuthorById(post.authorId);
  const category = getCategoryById(post.category);
  const related = getRelatedPosts(post);

  const handleComment = (form) => {
    setLocalComments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: form.name,
        avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${form.name}`,
        text: form.text,
        date: new Date().toISOString().split('T')[0],
      },
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Article */}
        <div className="lg:col-span-2">
          {/* Back */}
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-6 transition-colors">
            <ArrowLeft size={16} /> Back
          </button>

          {/* Category */}
          <Link to={`/categories/${post.category}`}
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${category?.color}`}>
            {category?.name}
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-5 serif">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <Link to={`/author/${author?.id}`} className="flex items-center gap-2 hover:opacity-80">
              <img src={author?.avatar} alt={author?.name} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">{author?.name}</p>
                <p className="text-xs text-slate-500">{author?.role}</p>
              </div>
            </Link>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 ml-auto">
              <span className="flex items-center gap-1"><Calendar size={14} />{format(new Date(post.publishDate), 'MMMM d, yyyy')}</span>
              <span className="flex items-center gap-1"><Clock size={14} />{post.readTime} min read</span>
              <span className="flex items-center gap-1"><Eye size={14} />{views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Cover */}
          <div className="rounded-2xl overflow-hidden mb-8 bg-slate-100 dark:bg-slate-800">
            <img src={post.coverImage} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
          </div>

          {/* Content */}
          <article className="max-w-none">
            <ArticleBody content={post.content} />
          </article>

          {/* Share */}
          <div className="mt-10 p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <ShareButtons title={post.title} url={window.location.href} />
          </div>

          {/* Author Box */}
          <div className="mt-8 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-4 items-start">
            <img src={author?.avatar} alt={author?.name} className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">Written by</p>
              <Link to={`/author/${author?.id}`}
                className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {author?.name}
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{author?.bio}</p>
            </div>
          </div>

          {/* Comments */}
          <section className="mt-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              💬 Comments ({localComments.length})
            </h3>
            <div className="space-y-4 mb-8">
              {localComments.length === 0 ? (
                <p className="text-slate-400 text-sm">No comments yet. Be the first!</p>
              ) : (
                localComments.map((c) => (
                  <div key={c.id} className="flex gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <img src={c.avatar} alt={c.author} className="w-9 h-9 rounded-full shrink-0 bg-slate-200 dark:bg-slate-700" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{c.author}</span>
                        <span className="text-xs text-slate-400">{format(new Date(c.date), 'MMM d, yyyy')}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <CommentForm onSubmit={handleComment} />
            </div>
          </section>

          {/* Related Posts */}
          {related.length > 0 && (
            <section className="mt-12">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">📚 Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((p) => <PostCard key={p.id} post={p} />)}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
