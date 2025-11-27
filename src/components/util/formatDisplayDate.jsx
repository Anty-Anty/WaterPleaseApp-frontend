
// --- Helper: safely format YYYY-MM-DD into "Mon 10" ---

export function formatDisplayDate(dateStr, locale = "en-US") {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d); // SAFE → no timezone shift
    return date.toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
    });
}

