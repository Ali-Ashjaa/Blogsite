// Mock data for the multi-author blogging platform
export const authors = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya&backgroundColor=b6e3f4",
    bio: "Tech enthusiast and full-stack developer. Writing about web dev, AI, and open source.",
    role: "Senior Author",
    posts: 12,
  },
  {
    id: 2,
    name: "Arjun Mehta",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Arjun&backgroundColor=d1d4f9",
    bio: "Lifestyle blogger & traveler. Sharing stories from 40+ countries.",
    role: "Author",
    posts: 8,
  },
  {
    id: 3,
    name: "Sofia Reyes",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sofia&backgroundColor=ffd5dc",
    bio: "Education advocate and e-learning designer. Helping learners worldwide.",
    role: "Author",
    posts: 10,
  },
  {
    id: 4,
    name: "James Okafor",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=James&backgroundColor=c0aede",
    bio: "General writer covering everything from culture to wellness.",
    role: "Author",
    posts: 6,
  },
];

export const categories = [
  { id: "technology", name: "Technology", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300", count: 8 },
  { id: "lifestyle", name: "Lifestyle", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300", count: 5 },
  { id: "education", name: "Education", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300", count: 6 },
  { id: "general", name: "General", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300", count: 4 },
  { id: "health", name: "Health", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300", count: 3 },
  { id: "finance", name: "Finance", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300", count: 2 },
];

export const posts = [
  {
    id: 1,
    slug: "building-scalable-react-apps-2025",
    title: "Building Scalable React Applications in 2025",
    excerpt: "Explore the latest patterns and best practices for building large-scale React applications — from state management to performance optimization and beyond.",
    content: `
## Introduction

React has evolved tremendously over the years, and 2025 brings even more powerful tools and patterns for building scalable applications. Whether you're working on a startup MVP or an enterprise dashboard, these principles will guide you.

## State Management in 2025

Gone are the days of bloated Redux boilerplates. Today's ecosystem offers lightweight, composable solutions:

- **Zustand** – Minimal and lightning-fast global state
- **Jotai** – Atomic state with a tiny API surface
- **TanStack Query** – Server state made effortless

\`\`\`js
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}))
\`\`\`

## Performance Optimization

### Code Splitting
Always lazy-load routes and heavy components:

\`\`\`js
const Dashboard = React.lazy(() => import('./Dashboard'))
\`\`\`

### Memoization
Use \`useMemo\` and \`useCallback\` strategically — not everywhere, but where profiling shows bottlenecks.

## Component Architecture

Follow the **Separation of Concerns** principle:

1. **UI Components** – Purely presentational, no data fetching
2. **Container Components** – Handle data and pass to UI
3. **Hooks** – Encapsulate all reusable stateful logic

## Conclusion

Scalable React apps aren't built overnight. Start with a solid foundation, choose the right tools for your use case, and iterate continuously. The patterns above have stood the test of time — embrace them!
    `,
    category: "technology",
    authorId: 1,
    publishDate: "2025-04-28",
    views: 3420,
    readTime: 6,
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    slug: "minimalist-living-guide-2025",
    title: "The Complete Guide to Minimalist Living in 2025",
    excerpt: "Discover how simplifying your possessions, habits, and mindset can unlock greater freedom, creativity, and happiness in your everyday life.",
    content: `
## What is Minimalism?

Minimalism isn't about owning as little as possible — it's about owning only what adds value to your life. It's a tool to rid yourself of excess so you can focus on what truly matters.

## Why Go Minimal?

- Less clutter = less stress
- More intentional spending = more savings
- Clear environment = clearer mind

## The 30-Day Declutter Challenge

Start small. Each day for 30 days, find one thing to remove from your life — donate, sell, or recycle it.

> "The things you own end up owning you." — Tyler Durden

## Digital Minimalism

Don't forget your digital life:

1. Unsubscribe from newsletters you never read
2. Delete apps you haven't opened in 3 months
3. Organize your files into a clean folder structure
4. Schedule device-free hours daily

## Mindful Consumption

Before buying anything, ask:
- Do I *need* this, or just *want* it?
- Will this add value in 6 months?
- Do I already have something similar?

## Conclusion

Minimalism is a journey, not a destination. Take it one step at a time, and enjoy the clarity it brings.
    `,
    category: "lifestyle",
    authorId: 2,
    publishDate: "2025-04-22",
    views: 2180,
    readTime: 5,
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    featured: true,
  },
  {
    id: 3,
    slug: "ai-in-education-transforming-learning",
    title: "How AI is Transforming Education in 2025",
    excerpt: "From personalized learning paths to intelligent tutoring systems, AI is reshaping classrooms globally. Here's what educators and students need to know.",
    content: `
## The AI Revolution in Classrooms

Artificial Intelligence has moved from science fiction to the heart of modern education. In 2025, AI tools are used by over 60% of educational institutions worldwide.

## Personalized Learning

Every student learns differently. AI systems now:

- Adapt content difficulty based on individual performance
- Identify learning gaps in real time
- Suggest practice exercises tailored to weaknesses

## Intelligent Tutoring Systems

AI tutors like **Khanmigo** and **Synthesis Tutor** provide instant, accurate feedback — available 24/7 without judgment.

## Benefits for Teachers

Teachers spend less time on:
- Grading repetitive assignments
- Creating individualized study plans
- Tracking student progress manually

And more time on:
- Building meaningful relationships
- Teaching critical thinking
- Creative lesson design

## Ethical Considerations

With great power comes great responsibility:

1. **Academic integrity** – AI detection tools are advancing alongside generative AI
2. **Data privacy** – Student data must be protected rigorously
3. **Equity** – AI must not widen the digital divide

## Looking Ahead

The future classroom is a partnership between human educators and AI tools — each enhancing the other's strengths.
    `,
    category: "education",
    authorId: 3,
    publishDate: "2025-04-18",
    views: 4150,
    readTime: 7,
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    featured: false,
  },
  {
    id: 4,
    slug: "mindfulness-modern-world",
    title: "Practicing Mindfulness in a Hyper-Connected World",
    excerpt: "With notifications pinging every second, finding inner stillness seems impossible. These evidence-based mindfulness techniques can help you reclaim your calm.",
    content: `
## Why Mindfulness Matters Now More Than Ever

The average person checks their phone 96 times a day. Our brains are overwhelmed with stimulation, and anxiety rates have never been higher. Mindfulness offers a lifeline.

## What the Research Says

Studies from Harvard Medical School show that:
- 8 weeks of mindfulness meditation reduces anxiety by 30%
- Regular practice physically changes brain structure (neuroplasticity)
- Mindful people report higher life satisfaction scores

## Simple Techniques to Start

### 1. The 4-7-8 Breathing Technique
- Inhale for 4 counts
- Hold for 7 counts  
- Exhale for 8 counts
- Repeat 4 times

### 2. The 5-4-3-2-1 Grounding Exercise
Notice:
- 5 things you can **see**
- 4 things you can **touch**
- 3 things you can **hear**
- 2 things you can **smell**
- 1 thing you can **taste**

### 3. Mindful Morning Routine
Before reaching for your phone:
- Sit quietly for 2 minutes
- Write 3 things you're grateful for
- Set one intention for the day

## Digital Detox Tips

- Turn off non-essential notifications
- Keep your phone out of the bedroom
- Designate screen-free meal times

## Conclusion

Mindfulness isn't about emptying your mind — it's about observing thoughts without attachment. Even 5 minutes a day can create profound change.
    `,
    category: "health",
    authorId: 4,
    publishDate: "2025-04-14",
    views: 1870,
    readTime: 5,
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    featured: false,
  },
  {
    id: 5,
    slug: "typescript-tips-senior-developers",
    title: "10 TypeScript Tips Every Senior Developer Should Know",
    excerpt: "Level up your TypeScript skills with these advanced patterns, utility types, and architectural tips that separate good code from great code.",
    content: `
## Why TypeScript Mastery Matters

TypeScript adoption has grown to over 80% in enterprise JavaScript projects. But most developers only scratch the surface of what's possible.

## Tip 1: Discriminated Unions

Perfect for modeling complex state:

\`\`\`ts
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; message: string }
\`\`\`

## Tip 2: Template Literal Types

\`\`\`ts
type EventName = \`on\${Capitalize<string>}\`
// Allows: 'onClick', 'onChange', 'onSubmit', etc.
\`\`\`

## Tip 3: Conditional Types

\`\`\`ts
type NonNullable<T> = T extends null | undefined ? never : T
\`\`\`

## Tip 4: Infer Keyword

Extract types from complex generics:

\`\`\`ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never
\`\`\`

## Tip 5: Mapped Types

\`\`\`ts
type Readonly<T> = { readonly [K in keyof T]: T[K] }
type Optional<T> = { [K in keyof T]?: T[K] }
\`\`\`

## Tip 6: satisfies Operator

Better type checking without losing inference:

\`\`\`ts
const config = {
  port: 8080,
  host: 'localhost'
} satisfies Record<string, string | number>
\`\`\`

## Conclusion

These patterns might take time to master, but they'll make your TypeScript code dramatically more expressive and bug-resistant.
    `,
    category: "technology",
    authorId: 1,
    publishDate: "2025-04-10",
    views: 5230,
    readTime: 8,
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    featured: false,
  },
  {
    id: 6,
    slug: "personal-finance-guide-millennials",
    title: "Personal Finance Mastery: A Millennial's Roadmap",
    excerpt: "From building an emergency fund to investing your first rupee, this practical guide covers everything you need to achieve financial independence.",
    content: `
## Why Financial Literacy is Non-Negotiable

Less than 30% of millennials feel confident managing their finances. Yet the decisions you make in your 20s and 30s compound dramatically over time.

## Step 1: Build Your Emergency Fund

Before investing, ensure you have **3-6 months of expenses** saved in a liquid account. This is your financial safety net.

## Step 2: Eliminate High-Interest Debt

Any debt above 7% interest should be paid off aggressively before you invest. Credit card debt at 24% APR will destroy any investment gains.

## Step 3: The 50/30/20 Rule

Allocate your take-home pay:
- **50%** — Needs (rent, food, utilities)
- **30%** — Wants (dining, entertainment)
- **20%** — Savings and debt repayment

## Step 4: Start Investing Early

₹5,000/month at 12% annual return:
- After 10 years: ₹11.6 lakh
- After 20 years: ₹44.9 lakh
- After 30 years: ₹1.5 crore

**The secret? Starting early.**

## Step 5: Diversify Your Portfolio

1. Index funds (low cost, broad exposure)
2. PPF / NPS (tax-advantaged)
3. Real estate (REITs for small investors)
4. Some international exposure

## Conclusion

Financial freedom isn't about being rich — it's about having choices. Start with any of these steps today, and your future self will thank you.
    `,
    category: "finance",
    authorId: 4,
    publishDate: "2025-04-05",
    views: 2890,
    readTime: 6,
    coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    featured: false,
  },
  {
    id: 7,
    slug: "future-remote-work-trends",
    title: "The Future of Remote Work: Trends Shaping 2025 and Beyond",
    excerpt: "Remote work has permanently altered the professional landscape. Discover the key trends, tools, and challenges defining how we work today.",
    content: `
## Remote Work is Here to Stay

Post-pandemic data confirms it: 65% of workers prefer hybrid or fully remote arrangements. Companies that ignore this lose talent to those who don't.

## Trend 1: Asynchronous-First Culture

The best remote teams operate async-first:
- Document everything
- Minimize synchronous meetings
- Trust outcomes over activity

## Trend 2: The Rise of Digital Nomadism

With visa programs in 50+ countries now welcoming digital nomads, location-independent work is mainstream.

## Trend 3: AI-Powered Collaboration

Tools like **Notion AI**, **GitHub Copilot**, and **Otter.ai** make async collaboration more efficient than ever.

## Trend 4: Results-Only Work Environment (ROWE)

Companies are shifting from tracking hours to measuring outcomes. Employees are judged purely on results.

## Challenges to Overcome

- **Isolation** – Intentional community building is essential
- **Burnout** – Work/life boundaries require active maintenance
- **Career growth** – Visibility in remote settings needs deliberate effort

## Building a Great Remote Work Setup

1. Dedicated workspace with good lighting
2. Ergonomic chair and standing desk
3. Reliable internet with backup
4. Noise-canceling headphones
5. Camera for video calls

## Conclusion

Remote work is not a temporary experiment — it's the future of professional life. Adapting early gives you a competitive edge.
    `,
    category: "general",
    authorId: 2,
    publishDate: "2025-03-30",
    views: 1540,
    readTime: 5,
    coverImage: "https://images.unsplash.com/photo-1591017403997-bdf081b33e0d?w=800&q=80",
    featured: false,
  },
  {
    id: 8,
    slug: "css-grid-vs-flexbox-2025",
    title: "CSS Grid vs Flexbox: When to Use Which in 2025",
    excerpt: "Both are powerful layout tools, but choosing the right one can make or break your CSS architecture. Here's a definitive guide with practical examples.",
    content: `
## The Great CSS Layout Debate

If you've ever stared at a layout problem wondering whether to reach for Grid or Flexbox — this article is for you.

## Flexbox: One-Dimensional Layouts

Flexbox excels at distributing space **along a single axis** (row or column).

**Best for:**
- Navigation bars
- Centering content
- Card component internals
- Button groups

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## CSS Grid: Two-Dimensional Layouts

Grid handles **rows AND columns** simultaneously.

**Best for:**
- Page layouts
- Image galleries
- Dashboard grids
- Magazine-style designs

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
\`\`\`

## The Simple Mental Model

> Use **Flexbox** when content dictates layout.
> Use **Grid** when layout dictates content.

## They Work Together!

There's no rule that says you can't use both. A common pattern:
- Grid for the overall page structure
- Flexbox for individual component internals

## Conclusion

2025 CSS is more powerful than ever. Master both tools and you'll handle any layout challenge with confidence.
    `,
    category: "technology",
    authorId: 1,
    publishDate: "2025-03-25",
    views: 3780,
    readTime: 5,
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
    featured: false,
  },
];

export const comments = {
  1: [
    { id: 1, author: "Dev Kumar", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Dev", text: "Great article! The section on state management is exactly what I needed.", date: "2025-04-29" },
    { id: 2, author: "Maria L.", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Maria", text: "Very well explained. Would love to see a follow-up on testing strategies.", date: "2025-04-30" },
  ],
  2: [
    { id: 1, author: "Ravi P.", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ravi", text: "The 30-day challenge is a great idea. Starting tomorrow!", date: "2025-04-23" },
  ],
  3: [
    { id: 1, author: "Teacher101", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Teacher", text: "As an educator, this is both exciting and a little scary. Great balanced perspective.", date: "2025-04-19" },
    { id: 2, author: "StudentLife", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Student", text: "My university is already using AI tutors. It's genuinely helpful for practice!", date: "2025-04-20" },
  ],
};

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getAuthorById(id) {
  return authors.find((a) => a.id === id);
}

export function getCategoryById(id) {
  return categories.find((c) => c.id === id);
}

export function getPostsByCategory(categoryId) {
  return posts.filter((p) => p.category === categoryId);
}

export function getRelatedPosts(post, limit = 3) {
  return posts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, limit);
}

export function searchPosts(query) {
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
