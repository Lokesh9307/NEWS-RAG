// Clean and format AI summaries into plain numbered points
export function formatSummary(rawText) {
  if (!rawText) return "";

  // Remove markdown symbols (*, **, etc.)
  let cleaned = rawText
    .replace(/\*\*/g, "") // remove bold markers
    .replace(/\*/g, "")   // remove list markers
    .replace(/#+/g, "");  // remove headers if any

  // Split into lines or sentences
  const parts = cleaned.split(/(?:\. |\n|;)/).map(p => p.trim()).filter(Boolean);

  // Return as numbered points
  return parts.map((p, i) => `${i + 1}. ${p}`).join("\n");
}
