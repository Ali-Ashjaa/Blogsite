import { posts as initialPosts } from '../data/posts';

const KEYS = {
  USERS: 'wordweaver_all_users',
  SESSION: 'wordweaver_user',
  SUBMISSIONS: 'wordweaver_submissions',
  MESSAGES: 'wordweaver_messages',
  SITE_POSTS: 'wordweaver_posts',
  SETTINGS: 'wordweaver_settings',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function read(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Users ────────────────────────────────────────────────────────────────────

export const usersDB = {
  getAll: () => read(KEYS.USERS, []),
  init: () => {
    if (!localStorage.getItem(KEYS.USERS)) {
      write(KEYS.USERS, [
        { id: 1, name: 'Admin', email: 'admin@wordweaver.com', password: 'admin123', role: 'admin', createdAt: new Date().toISOString() },
      ]);
    }
  },
  add: (user) => {
    const all = usersDB.getAll();
    all.push(user);
    write(KEYS.USERS, all);
  },
  findByEmail: (email) => usersDB.getAll().find((u) => u.email.toLowerCase() === (email || '').toLowerCase()),
  count: () => usersDB.getAll().length,
};

// ─── Session ──────────────────────────────────────────────────────────────────

export const sessionDB = {
  get: () => read(KEYS.SESSION, null),
  set: (user) => write(KEYS.SESSION, user),
  clear: () => localStorage.removeItem(KEYS.SESSION),
};

// ─── Submissions ──────────────────────────────────────────────────────────────

export const submissionsDB = {
  getAll: () => read(KEYS.SUBMISSIONS, []).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)),
  add: (submission) => {
    const all = submissionsDB.getAll();
    write(KEYS.SUBMISSIONS, [submission, ...all]);
  },
  updateStatus: (id, status) => {
    const all = submissionsDB.getAll();
    const updated = all.map((s) => (s.id === id ? { ...s, status } : s));
    write(KEYS.SUBMISSIONS, updated);
    return updated;
  },
  delete: (id) => {
    const all = submissionsDB.getAll().filter((s) => s.id !== id);
    write(KEYS.SUBMISSIONS, all);
    return all;
  },
  count: () => submissionsDB.getAll().length,
  pendingCount: () => submissionsDB.getAll().filter((s) => s.status === 'pending').length,
};

// ─── Contact Messages ─────────────────────────────────────────────────────────

export const messagesDB = {
  getAll: () => read(KEYS.MESSAGES, []).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)),
  add: (message) => {
    const all = messagesDB.getAll();
    write(KEYS.MESSAGES, [message, ...all]);
  },
  markRead: (id) => {
    const all = messagesDB.getAll();
    const updated = all.map((m) => (m.id === id ? { ...m, read: true } : m));
    write(KEYS.MESSAGES, updated);
    return updated;
  },
  delete: (id) => {
    const all = messagesDB.getAll().filter((m) => m.id !== id);
    write(KEYS.MESSAGES, all);
    return all;
  },
  count: () => messagesDB.getAll().length,
  unreadCount: () => messagesDB.getAll().filter((m) => !m.read).length,
};

// ─── Posts (Migrated & Admin Created) ────────────────────────────────────────

export const postsDB = {
  getAll: () => read(KEYS.SITE_POSTS, []),
  init: () => {
    if (!localStorage.getItem(KEYS.SITE_POSTS)) {
      const formatted = initialPosts.map(p => ({
        ...p,
        status: 'published',
        source: 'initial'
      }));
      write(KEYS.SITE_POSTS, formatted);
    }
  },
  add: (post) => {
    const all = postsDB.getAll();
    const newPost = { ...post, status: post.status || 'published' };
    write(KEYS.SITE_POSTS, [newPost, ...all]);
  },
  delete: (id) => {
    const all = postsDB.getAll().filter((p) => p.id !== id);
    write(KEYS.SITE_POSTS, all);
    return all;
  },
  update: (id, changes) => {
    const all = postsDB.getAll().map((p) => (p.id === id ? { ...p, ...changes } : p));
    write(KEYS.SITE_POSTS, all);
    return all;
  },
  toggleStatus: (id) => {
    const all = postsDB.getAll();
    const updated = all.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'hidden' ? 'published' : 'hidden' };
      }
      return p;
    });
    write(KEYS.SITE_POSTS, updated);
    return updated;
  }
};

// ─── Site Settings ────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  siteName: 'WordWeaver',
  tagline: 'Where Words Connect',
  adminEmail: 'admin@wordweaver.com',
  contactEmail: 'hello@wordweaver.com',
  seoDescription: 'WordWeaver — A premium multi-author blogging platform for deep insights and creative stories.',
  seoKeywords: 'blog, articles, writing, journalism, culture, society',
  twitterHandle: '@wordweaver',
  allowSignups: true,
  allowSubmissions: true,
  postsPerPage: 9,
  updatedAt: null,
};

export const settingsDB = {
  get: () => ({ ...DEFAULT_SETTINGS, ...read(KEYS.SETTINGS, {}) }),
  update: (changes) => {
    const current = settingsDB.get();
    const updated = { ...current, ...changes, updatedAt: new Date().toISOString() };
    write(KEYS.SETTINGS, updated);
    return updated;
  },
};

