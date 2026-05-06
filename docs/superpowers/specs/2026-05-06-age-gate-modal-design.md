# Age Gate Modal Implementation

> **Goal:** Implement 18+ age verification modal that blocks homepage access until user confirms age eligibility for alcohol event.

---

## Architecture

Age Gate Modal appears on first visit, blocks homepage content until verified. Uses localStorage to cache verification status for 30 days.

**Key Components:**
- `AgeGateModal.tsx` - full-screen overlay modal
- Integration point: `LayoutClient.tsx` (render before children)
- i18n: translations.ts (PT/ES)
- Storage: localStorage `oda_age_verified` with timestamp

---

## Component Design

### AgeGateModal.tsx

**Visual Structure:**
- Full-screen overlay: `fixed inset-0 bg-black/80 z-50`
- Centered card: `max-w-md bg-wine rounded-lg p-8`
- No close button (forces interaction)

**Content:**
- Title: "Verificación de Edad" / "Verificação de Idade"
- Question: "¿Eres mayor de 18 años?" / "Você tem 18 anos ou mais?"
- Disclaimer text: ~100 words about responsible consumption
- Two buttons:
  - Primary: "Tengo 18+" / "Tenho 18+" (green/harvest color)
  - Secondary: "No tengo 18" / "Não tenho 18" (muted)

**State Management:**
```tsx
const [showModal, setShowModal] = useState(true);
const [rejectionMessage, setRejectionMessage] = useState(false);
const { language } = useLanguage();
```

**Behavior:**
- "Tengo 18+" → Set localStorage, close modal
- "No tengo 18" → Show retry message, disable button for 3s, allow retry
- On load: Check localStorage; skip modal if verified

---

## Data Persistence

**localStorage Key:** `oda_age_verified`

**Value Structure:**
```json
{
  "verified": true,
  "timestamp": 1715000000000,
  "language": "es"
}
```

**Expiration:** 30 days (86400000ms * 30)

**Logic:**
```
User visits → Check localStorage
  - If exists AND timestamp within 30 days → Skip modal
  - If missing OR expired → Show modal
  
User accepts → Set localStorage, close modal
User rejects → Show "Reintentar" message, allow retry after 3s
```

---

## Internationalization

**Translation Keys** (add to `translations.ts`):

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

**Language Context:** Auto-switch via `useLanguage()` from LanguageContext

---

## Integration Point

**File:** `src/components/LayoutClient.tsx`

**Render Order:**
```tsx
<LanguageProvider>
  <AgeGateModal /> {/* Renders first, blocks if not verified */}
  {/* Rest of layout */}
</LanguageProvider>
```

Modal sits above all content with z-50, prevents interaction with page until verified.

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/components/AgeGateModal.tsx` | Create | Main modal component |
| `src/lib/translations.ts` | Modify | Add 6 new translation keys |
| `src/components/LayoutClient.tsx` | Modify | Import & render AgeGateModal |

---

## Success Criteria

✅ Modal appears on first visit, blocks homepage  
✅ Age verification stored 30 days in localStorage  
✅ "Tengo 18+" closes modal, shows homepage  
✅ "No tengo 18" shows retry message, allows reintentos  
✅ Bilingual (PT/ES) based on language setting  
✅ No close button (forces decision)  
✅ Styled per brand (wine/harvest colors)  

---

## Testing Checklist

- [ ] Clear localStorage, reload → Modal appears
- [ ] Click "Tengo 18+" → localStorage set, modal closes, homepage shows
- [ ] Click "No tengo 18" → Message shows, button disabled 3s, can retry
- [ ] Switch language (ES/PT) → Text updates
- [ ] Wait 30 days (or manually edit timestamp) → Modal reappears
- [ ] Mobile responsive: modal readable on 375px width
