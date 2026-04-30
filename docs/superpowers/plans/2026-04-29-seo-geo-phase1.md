# SEO/GEO Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement foundational SEO infrastructure (sitemap, robots.txt, hreflang tags) to improve local Google ranking for Brazil (90% audience) and Argentina.

**Architecture:** 
- Create static SEO files (`sitemap.xml`, `robots.txt`) in `/public` for Google crawling and indexing
- Add hreflang meta tags to `layout.tsx` Metadata to signal language/region variants and prevent duplicate content penalties
- All changes are static, zero runtime cost, leverage Next.js native metadata support

**Tech Stack:** Next.js 14+ (App Router), Vercel, no new dependencies

---

## File Structure

**Files to create:**
- `public/sitemap.xml` — Static XML sitemap for Google crawler
- `public/robots.txt` — Crawl directives for search engines

**Files to modify:**
- `src/app/layout.tsx` — Add hreflang tags to Metadata export

---

## Task 1: Create sitemap.xml

**Files:**
- Create: `public/sitemap.xml`

- [ ] **Step 1: Create sitemap.xml file**

Create the file `/public/sitemap.xml` with the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://odaalvino.com.br/</loc>
    <lastmod>2026-04-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://odaalvino.com.br/faq</loc>
    <lastmod>2026-04-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

**Why this content:**
- Homepage (priority 1.0): most important page for ranking
- FAQ (priority 0.9): will exist in Phase 2, pre-added to avoid sitemap update
- `lastmod`: helps Google understand when content was last updated
- `changefreq`: tells Google how often to re-crawl (weekly for homepage due to event countdown)

- [ ] **Step 2: Verify file is readable**

Run:
```bash
cat /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3/public/sitemap.xml | head -5
```

Expected output: First 5 lines of XML with `<?xml` declaration and `<urlset>` tag.

---

## Task 2: Create robots.txt

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Create robots.txt file**

Create the file `/public/robots.txt` with the following content:

```
# Crawl directives for all bots
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /*.json$
Disallow: /node_modules/

# Crawl delay (optional, conservative 1 second)
Crawl-delay: 1

# Reference to sitemap for discovery
Sitemap: https://odaalvino.com.br/sitemap.xml
```

**Why this content:**
- `Allow: /` — permits crawling of all public content
- `Disallow: /api/` — prevents indexing of API routes (not user-facing)
- `Disallow: /_next/` — prevents indexing of Next.js internals
- `Crawl-delay: 1` — respects server resources (1 second between requests)
- `Sitemap:` — points Google directly to sitemap URL for faster discovery

- [ ] **Step 2: Verify file is readable**

Run:
```bash
cat /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3/public/robots.txt
```

Expected output: All robots.txt directives displayed without errors.

---

## Task 3: Add hreflang tags to layout.tsx

**Files:**
- Modify: `src/app/layout.tsx` (in the Metadata export)

- [ ] **Step 1: Read current layout.tsx**

Read the file to understand the current Metadata structure:

```bash
head -30 /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3/src/app/layout.tsx
```

Expected: Current Metadata export with title, description, icons, openGraph.

- [ ] **Step 2: Update Metadata export to include alternates**

Edit `src/app/layout.tsx` to add `alternates` property to the Metadata object.

Find this section:
```typescript
export const metadata: Metadata = {
  title: "ODA AL VINO 2026 | El vino nos reúne",
  description:
    "Viví la experiencia del vino más importante de la Triple Frontera. 10° edición OAV - 25 años ODA.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
```

Replace with:
```typescript
export const metadata: Metadata = {
  title: "ODA AL VINO 2026 | El vino nos reúne",
  description:
    "Viví la experiencia del vino más importante de la Triple Frontera. 10° edición OAV - 25 años ODA.",
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: "https://odaalvino.com.br",
    languages: {
      "pt-BR": "https://odaalvino.com.br",
      "es-AR": "https://odaalvino.com.ar",
      "x-default": "https://odaalvino.com.br",
    },
  },
  openGraph: {
```

**Why this works:**
- `canonical`: tells Google this is the authoritative version (prevents duplicate content)
- `languages`: maps language/region codes to their respective URLs
  - `pt-BR`: Portuguese (Brazil) → points to `.br` domain
  - `es-AR`: Spanish (Argentina) → points to `.ar` domain (redirects to `.br` but signals intent)
  - `x-default`: fallback for unlisted languages → defaults to `.br` (primary market)

- [ ] **Step 3: Verify hreflang tags are correct**

Run:
```bash
grep -A 10 "alternates:" /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3/src/app/layout.tsx
```

Expected output: Alternates object with canonical and languages properties visible.

- [ ] **Step 4: Build to verify no TypeScript errors**

Run:
```bash
cd /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3 && npm run build 2>&1 | grep -E "✓|error|Error" | head -5
```

Expected output: `✓ Compiled successfully` (no TypeScript errors in layout.tsx).

---

## Task 4: Commit and push changes

**Files:**
- `public/sitemap.xml` (new)
- `public/robots.txt` (new)
- `src/app/layout.tsx` (modified)

- [ ] **Step 1: Check git status**

Run:
```bash
cd /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3 && git status
```

Expected output: Untracked files `public/sitemap.xml` and `public/robots.txt`, modified `src/app/layout.tsx`.

- [ ] **Step 2: Stage files**

Run:
```bash
cd /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3 && git add public/sitemap.xml public/robots.txt src/app/layout.tsx
```

Expected output: No error (silent success).

- [ ] **Step 3: Commit with descriptive message**

Run:
```bash
cd /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3 && git commit -m "feat: implement SEO Phase 1 - sitemap, robots.txt, hreflang tags

- Add public/sitemap.xml with homepage + FAQ URLs
- Add public/robots.txt with crawl directives
- Add hreflang tags to layout.tsx for PT-BR and ES-AR localization
- Improves Google local ranking and geo-targeting for Brazil (90% audience)

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

Expected output: Commit hash and file changes summary.

- [ ] **Step 4: Push to remote**

Run:
```bash
cd /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3 && git push origin main 2>&1 | tail -3
```

Expected output: Branch update confirmation (e.g., `main -> main`).

- [ ] **Step 5: Verify push succeeded**

Run:
```bash
cd /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3 && git log --oneline -1
```

Expected output: Latest commit message showing SEO Phase 1 changes.

---

## Verification Checklist

After completing all tasks:

- [ ] `sitemap.xml` exists at `public/sitemap.xml` and is valid XML
- [ ] `robots.txt` exists at `public/robots.txt` with correct directives
- [ ] `layout.tsx` contains `alternates` property with hreflang tags
- [ ] Build passes with no TypeScript errors
- [ ] All changes committed and pushed to `main` branch
- [ ] Vercel deployment triggered automatically (check Vercel dashboard)

---

## Next Phase

Once Phase 1 is live (2-3 hours for Vercel deployment):
- Test sitemap discovery via Google Search Console (submit URL)
- Verify hreflang tags via URL Inspection tool
- Proceed to Phase 2: Create FAQ page with schema markup

---

## Self-Review

✅ **Spec coverage:** 
- Sitemap.xml (Task 1) ✓
- Robots.txt (Task 2) ✓
- Hreflang tags (Task 3) ✓
- Git commit (Task 4) ✓

✅ **No placeholders:** All steps have exact code, commands, expected outputs.

✅ **Type consistency:** 
- URL format consistent across sitemap and hreflang
- Language codes match (pt-BR, es-AR, x-default)
- File paths are absolute and correct

✅ **Spec requirements met:** All three components from design doc implemented.

---
