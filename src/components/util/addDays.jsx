
export function addDays(dateStr, days) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const base = new Date(y, m - 1, d); // safe construction, no TZ issues
    base.setDate(base.getDate() + Number(days));

    // Format as "Sep 15"
    return base.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}