/**
 * Formats a date string to a localized format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Truncates text to a specified length and adds an ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Creates a slug from a string (for URLs)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

/**
 * Classnames utility for conditional class application
 * Example: cn('base-class', { 'active-class': isActive, 'disabled-class': isDisabled })
 */
export function cn(...classes: (string | Record<string, boolean>)[]): string {
  return classes
    .map((cls) => {
      if (typeof cls === "string") return cls;
      return Object.entries(cls)
        .filter(([, value]) => Boolean(value))
        .map(([key]) => key)
        .join(" ");
    })
    .filter(Boolean)
    .join(" ");
}
