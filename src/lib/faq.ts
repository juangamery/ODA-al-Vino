import { translations } from "./translations";

type Key = keyof typeof translations.es;

// Purchase, pricing and operational questions (5–8, 10, 14, 16–20) stay in translations for future editions.
export const faqItems: { id: number; questionKey: Key; answerKey: Key }[] = [
  { id: 1, questionKey: "faqQuestion1", answerKey: "faqAnswer1" },
  { id: 3, questionKey: "faqQuestion3", answerKey: "faqAnswer3" },
  { id: 2, questionKey: "faqQuestion2", answerKey: "faqAnswer2" },
  { id: 9, questionKey: "faqQuestion9", answerKey: "faqAnswer9" },
  { id: 11, questionKey: "faqQuestion11", answerKey: "faqAnswer11" },
  { id: 12, questionKey: "faqQuestion12", answerKey: "faqAnswer12" },
  { id: 21, questionKey: "faqQuestion21", answerKey: "faqAnswer21" },
  { id: 13, questionKey: "faqQuestion13", answerKey: "faqAnswer13" },
  { id: 15, questionKey: "faqQuestion15", answerKey: "faqAnswer15" },
];
