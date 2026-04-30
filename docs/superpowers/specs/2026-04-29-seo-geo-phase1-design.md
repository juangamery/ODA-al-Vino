# SEO/GEO Optimization - Phase 1: Quick Wins
**Date:** 2026-04-29  
**Project:** ODA AL VINO 2026  
**Scope:** Sitemap, Robots.txt, Hreflang tags for BR/AR localization

---

## Overview

Phase 1 implements foundational SEO infrastructure to improve local Google ranking and geo-targeting for Brazil (90% audience) and Argentina. Focus: simple, high-impact improvements with minimal effort.

**Goals:**
- Enable Google to crawl and index site efficiently
- Signal language/region variants to search engines
- Improve visibility in local/geo-specific searches (Brazil primary)

---

## 1. Sitemap.xml

### Purpose
Provides Google a complete map of site URLs with metadata (last modified, priority, change frequency).

### Implementation
**File location:** `/public/sitemap.xml`

**Content structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://odaalvino.com.br/</loc>
    <lastmod>2026-04-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Additional URLs: sections, FAQ (when ready) -->
</urlset>
```

**URLs to include:**
- Homepage: `/` (priority 1.0)
- Content sections: `/` (already in homepage as anchors)
- FAQ page: `/faq` (priority 0.9) — *added in Phase 2*

### Why Sitemap Matters
- Crawl efficiency: tells Google exactly what to index
- Metadata: signals importance (priority) and update frequency
- Local SEO: increases visibility in geo-specific searches

---

## 2. Robots.txt

### Purpose
Instructs search engines which content to crawl and respect site bandwidth/resources.

### Implementation
**File location:** `/public/robots.txt`

**Content:**
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /static/

Sitemap: https://odaalvino.com.br/sitemap.xml
```

### Why Robots.txt Matters
- Controls crawl budget (Google allocates limited crawl resources)
- Prevents indexing of unnecessary files (API routes, build artifacts)
- Provides sitemap URL for discovery

---

## 3. Hreflang Tags

### Purpose
Tells Google that content exists in multiple languages/regions (PT-BR, ES-AR) to avoid duplicate content penalties and improve regional ranking.

### Implementation
**Location:** `src/app/layout.tsx` in `<head>`

**Code pattern:**
```html
<link rel="canonical" href="https://odaalvino.com.br/" />
<link rel="alternate" hreflang="pt-BR" href="https://odaalvino.com.br/" />
<link rel="alternate" hreflang="es-AR" href="https://odaalvino.com.ar/" />
<link rel="alternate" hreflang="x-default" href="https://odaalvino.com.br/" />
```

### Why Hreflang Matters
- Language/region signaling: Google shows Portuguese results to Brazil, Spanish to Argentina
- Duplicate content: prevents SEO penalty for having same content in multiple languages
- Geo-targeting: improves local ranking when users search in their language

### Current State
- `.br` domain (Vercel) = primary for Brazil (90% audience)
- `.ar` domain (cPanel redirect) = will redirect to `.br`, but hreflang improves signal clarity
- Future: if dedicated `.ar` content, hreflang becomes more critical

---

## 4. Implementation Order

1. **Sitemap.xml** (5 min)
   - Create `/public/sitemap.xml`
   - Include homepage + future FAQ page URL
   - Register in Google Search Console

2. **Robots.txt** (5 min)
   - Create `/public/robots.txt`
   - Block crawl of `/api/`, `/_next/`, unnecessary paths

3. **Hreflang Tags** (10 min)
   - Add to `layout.tsx` in Next.js Metadata API or `<head>`
   - Test with Google Search Console URL Inspection tool

---

## 5. Testing & Validation

- **Google Search Console:** Submit sitemap, inspect URL, check coverage
- **Mobile-Friendly Test:** Ensure site is mobile-responsive (ranking factor)
- **Lighthouse SEO Audit:** Check for missing meta tags, accessibility issues
- **Hreflang Validator:** Verify tags are correct and discoverable

---

## 6. Success Criteria

✅ Sitemap.xml discoverable at `/sitemap.xml`  
✅ Robots.txt discoverable at `/robots.txt`  
✅ Hreflang tags present in HTML `<head>`  
✅ Google Search Console shows no crawl errors  
✅ No duplicate content warnings  

---

## 7. Next Phase (Phase 2)

- Create `/faq` page with 15-20 FAQs targeting Brazilian searches
- Add FAQPage schema JSON-LD
- Add Event + LocalBusiness schema to homepage

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Metadata API:** Next.js `Metadata` object in `layout.tsx`
- **Files:** Static files in `/public/` directory
- **Hosting:** Vercel (auto-deploys on git push)
- **Languages:** Portuguese (PT-BR primary), Spanish (ES-AR secondary)

---

## Dependencies

- No new packages required (Next.js handles metadata natively)
- `git` for committing changes
