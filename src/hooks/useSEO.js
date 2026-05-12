import { useEffect } from 'react';
import { settingsDB } from '../lib/db';

/**
 * useSEO — Sets <title>, meta description, og tags, canonical, and structured data
 * Call this at the top of every page component.
 */
export function useSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  article,
}) {
  useEffect(() => {
    const settings = settingsDB.get();
    const siteName = settings.siteName || 'WordWeaver';
    const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — ${settings.tagline}`;
    const defaultDesc = settings.seoDescription || 'WordWeaver is a premium multi-author blogging platform.';
    const metaDesc = description || defaultDesc;
    const canonical = url || window.location.href;
    const ogImage = image || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80';
    const twitterHandle = settings.twitterHandle || '@wordweaver';

    // Title
    document.title = fullTitle;

    // Helper to set / create meta tags
    const setMeta = (selector, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const attr = selector.includes('[name') ? 'name' : 'property';
        const val = selector.match(/["']([^"']+)["']/)?.[1];
        if (attr && val) el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Standard meta
    setMeta('[name="description"]', metaDesc);
    if (keywords) setMeta('[name="keywords"]', keywords);
    setMeta('[name="robots"]', 'index, follow');
    setMeta('[name="author"]', siteName);

    // Canonical
    setLink('canonical', canonical);

    // Open Graph
    setMeta('[property="og:title"]', fullTitle);
    setMeta('[property="og:description"]', metaDesc);
    setMeta('[property="og:image"]', ogImage);
    setMeta('[property="og:url"]', canonical);
    setMeta('[property="og:type"]', type);
    setMeta('[property="og:site_name"]', siteName);

    // Twitter Card
    setMeta('[name="twitter:card"]', 'summary_large_image');
    setMeta('[name="twitter:title"]', fullTitle);
    setMeta('[name="twitter:description"]', metaDesc);
    setMeta('[name="twitter:image"]', ogImage);
    setMeta('[name="twitter:site"]', '@wordweaver');

    // Article-specific structured data
    if (type === 'article' && article) {
      const existing = document.querySelector('#ld-json-article');
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.id = 'ld-json-article';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: metaDesc,
        image: ogImage,
        author: {
          '@type': 'Person',
          name: article.author || siteName,
        },
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: { '@type': 'ImageObject', url: `${window.location.origin}/favicon.ico` },
        },
        datePublished: article.publishDate || new Date().toISOString(),
        dateModified: article.publishDate || new Date().toISOString(),
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      });
      document.head.appendChild(script);
    }

    // Website structured data (for homepage)
    if (type === 'website') {
      const existing = document.querySelector('#ld-json-site');
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.id = 'ld-json-site';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: window.location.origin,
        description: metaDesc,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      });
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup article LD+JSON on unmount
      const ldArticle = document.querySelector('#ld-json-article');
      if (ldArticle) ldArticle.remove();
    };
  }, [title, description, keywords, image, url, type, article]);
}
