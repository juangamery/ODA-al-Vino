# Age Gate Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 18+ age verification modal that blocks homepage until user confirms age eligibility, with localStorage persistence and bilingual (PT/ES) support.

**Architecture:** AgeGateModal component renders in LayoutClient before page content, checks localStorage for verification status, displays full-screen overlay on first visit, stores verification with 30-day expiration.

**Tech Stack:** React, Next.js, Tailwind CSS, i18n (useLanguage context), localStorage

---

## File Structure

| File | Action | Responsibility |
|------|--------|-----------------|
| `src/components/AgeGateModal.tsx` | Create | Modal overlay, state, localStorage logic, button handlers |
| `src/lib/translations.ts` | Modify | Add 6 translation keys (PT/ES) |
| `src/components/LayoutClient.tsx` | Modify | Import AgeGateModal, render before children |

---

## Task 1: Create AgeGateModal Component

**Files:**
- Create: `src/components/AgeGateModal.tsx`

- [ ] **Step 1: Create file with imports and state**

Create `src/components/AgeGateModal.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

const AGE_GATE_KEY = "oda_age_verified";
const AGE_GATE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

export function AgeGateModal() {
  const [showModal, setShowModal] = useState(true);
  const [rejectionMessage, setRejectionMessage] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem(AGE_GATE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const now = Date.now();
        if (data.timestamp && now - data.timestamp < AGE_GATE_EXPIRY) {
          setShowModal(false);
          return;
        }
      } catch (e) {
        // Invalid JSON, show modal
      }
    }
    setShowModal(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(
      AGE_GATE_KEY,
      JSON.stringify({
        verified: true,
        timestamp: Date.now(),
        language
      })
    );
    setShowModal(false);
  };

  const handleReject = () => {
    setRejectionMessage(true);
    setTimeout(() => setRejectionMessage(false), 3000);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-wine rounded-lg p-8 max-w-md mx-4 text-center space-y-6">
        <h2 className="font-serif text-3xl text-paper">
          {t("ageGateTitle", language)}
        </h2>

        <p className="text-lg text-paper/90">
          {t("ageGateQuestion", language)}
        </p>

        <p className="text-sm text-paper/75 leading-relaxed">
          {t("ageGateDisclaimer", language)}
        </p>

        {rejectionMessage && (
          <p className="text-sm text-harvest font-semibold">
            {t("ageGateRetry", language)}
          </p>
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleAccept}
            className="flex-1 bg-harvest text-wine font-bold py-3 rounded-lg hover:bg-harvest/90 transition-colors"
          >
            {t("ageGateYes", language)}
          </button>
          <button
            onClick={handleReject}
            disabled={rejectionMessage}
            className={`flex-1 border-2 border-paper/40 text-paper font-bold py-3 rounded-lg transition-all ${
              rejectionMessage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-paper/10"
            }`}
          >
            {t("ageGateNo", language)}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify file syntax**

Run: `cd /Users/carlosfedericogunther/Downloads/antigravity/ODAalVINO/OAVv3 && npx tsc --noEmit src/components/AgeGateModal.tsx`

Expected: No errors

- [ ] **Step 3: Commit component**

```bash
git add src/components/AgeGateModal.tsx
git commit -m "feat: create AgeGateModal component with localStorage and UI"
```

---

## Task 2: Add Translation Keys

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Add age gate translation keys**

Open `src/lib/translations.ts` and add these keys to the translations object (find a good location, ideally after footer or compliance keys):

```tsx
// Age Gate Modal
ageGateTitle: {
  es: "Verificación de Edad",
  pt: "Verificação de Idade"
},
ageGateQuestion: {
  es: "¿Eres mayor de 18 años?",
  pt: "Você tem 18 anos ou mais?"
},
ageGateDisclaimer: {
  es: "El consumo de bebidas alcohólicas es exclusivo para mayores de 18 años. Este evento contiene alcohol. Por favor, consume con responsabilidad.",
  pt: "O consumo de bebidas alcoólicas é exclusivo para maiores de 18 anos. Este evento contém álcool. Por favor, consuma com responsabilidade."
},
ageGateYes: {
  es: "Tengo 18+",
  pt: "Tenho 18+"
},
ageGateNo: {
  es: "No tengo 18",
  pt: "Não tenho 18"
},
ageGateRetry: {
  es: "Reintentar",
  pt: "Tentar novamente"
}
```

- [ ] **Step 2: Verify translations.ts compiles**

Run: `npx tsc --noEmit src/lib/translations.ts`

Expected: No errors

- [ ] **Step 3: Commit translations**

```bash
git add src/lib/translations.ts
git commit -m "feat: add age gate modal translations (PT/ES)"
```

---

## Task 3: Integrate into LayoutClient

**Files:**
- Modify: `src/components/LayoutClient.tsx`

- [ ] **Step 1: Find LayoutClient file and read it**

Run: `head -30 src/components/LayoutClient.tsx`

This shows the import structure and where to add AgeGateModal.

- [ ] **Step 2: Add AgeGateModal import**

Add after existing imports (around line 5-10):

```tsx
import { AgeGateModal } from "@/components/AgeGateModal";
```

- [ ] **Step 3: Render AgeGateModal in JSX**

Find the return statement where children are rendered (inside LanguageProvider). Add AgeGateModal right after LanguageProvider opens:

```tsx
return (
  <LanguageProvider>
    <AgeGateModal />
    {/* rest of component */}
  </LanguageProvider>
);
```

This ensures modal appears before any page content.

- [ ] **Step 4: Verify no syntax errors**

Run: `npx tsc --noEmit src/components/LayoutClient.tsx`

Expected: No errors

- [ ] **Step 5: Commit integration**

```bash
git add src/components/LayoutClient.tsx
git commit -m "feat: integrate AgeGateModal into LayoutClient"
```

---

## Task 4: Test localStorage Functionality

**Files:**
- Test: Browser console test

- [ ] **Step 1: Clear localStorage and test first visit**

In browser DevTools console:
```javascript
localStorage.clear();
// Reload page
// Expected: Age gate modal appears
```

- [ ] **Step 2: Click "Tengo 18+" and verify localStorage is set**

```javascript
JSON.parse(localStorage.getItem("oda_age_verified"))
// Expected: {verified: true, timestamp: 1715..., language: "es"}
```

- [ ] **Step 3: Reload page and verify modal doesn't appear**

```javascript
location.reload();
// Expected: Modal hidden, homepage visible
```

- [ ] **Step 4: Test rejection flow**

```javascript
localStorage.clear();
location.reload();
// Click "No tengo 18" button
// Expected: Button disables for 3s, shows retry message
// After 3s: Can click again
```

---

## Task 5: Test Bilingual Switching

**Files:**
- Test: Browser manual test

- [ ] **Step 1: Test Spanish language**

Clear localStorage, reload, language switch to ES:
```javascript
localStorage.clear();
// Reload and switch language to ES via UI
// Expected: "Verificación de Edad" in modal title
```

- [ ] **Step 2: Test Portuguese language**

Switch language to PT:
```javascript
// Switch to PT via language switcher
// Expected: "Verificação de Idade" in modal title
```

- [ ] **Step 3: Verify text updates on switch**

```javascript
// While modal open, switch languages rapidly
// Expected: Modal text updates immediately for each language
```

---

## Task 6: Test Mobile Responsiveness

**Files:**
- Test: Browser DevTools mobile emulation

- [ ] **Step 1: Test on 375px width (iPhone SE)**

Open DevTools, set viewport to 375x667:
```
Expected:
- Modal centered and readable
- Buttons full-width and tappable (>44px height)
- Text not truncated
- Padding visible on sides (mx-4)
```

- [ ] **Step 2: Test on 768px width (tablet)**

Set viewport to 768x1024:
```
Expected:
- Modal still readable
- Layout unchanged (max-w-md handles sizing)
```

- [ ] **Step 3: Test on desktop (1280px)**

Set viewport to 1280x800:
```
Expected:
- Modal centered, not stretched
- Proper spacing around content
```

---

## Task 7: Final Testing & Commit

**Files:**
- All above

- [ ] **Step 1: Build the project**

Run: `npm run build`

Expected: No build errors

- [ ] **Step 2: Run dev server and test end-to-end**

```bash
npm run dev
# Open http://localhost:3000
# Clear localStorage
# Reload
# Expected: Modal appears, can interact, stores in localStorage
```

- [ ] **Step 3: Test with Vercel deploy**

Push to GitHub:
```bash
git push origin main
```

Wait for Vercel build to complete, test on production URL.

- [ ] **Step 4: Final commit if any fixes needed**

If issues found, fix them, then:
```bash
git commit -m "fix: [description]"
git push origin main
```

---

## Summary of Changes

**Created:**
- `src/components/AgeGateModal.tsx` - Full modal component with localStorage, state, i18n

**Modified:**
- `src/lib/translations.ts` - 6 new keys (ageGateTitle, ageGateQuestion, ageGateDisclaimer, ageGateYes, ageGateNo, ageGateRetry)
- `src/components/LayoutClient.tsx` - Import and render AgeGateModal

**Total additions:** ~150 lines of code
**Total commits:** 3 (component + translations + integration)

---

## Verification Against Spec

✅ Modal appears on first visit, blocks homepage  
✅ 18+ age requirement  
✅ localStorage persistence with 30-day expiration  
✅ "Tengo 18+" closes modal and stores verification  
✅ "No tengo 18" shows retry message, allows reintentos  
✅ Bilingual (PT/ES) via useLanguage context  
✅ No close button (forced decision)  
✅ Styled with wine/harvest colors per brand  
✅ Responsive on mobile (375px+)  
