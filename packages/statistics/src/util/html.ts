const HTML_ESCAPES: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
};

const HTML_PATTERN = /[&<>"']/g;
const ATTR_PATTERN = /[&<>"]/g;

/**
 * Escapes a value for safe interpolation into HTML text content.
 */
export function escapeHtml(value: unknown): string {
    return String(value ?? '').replace(HTML_PATTERN, char => HTML_ESCAPES[char]);
}

/**
 * Escapes a value for safe interpolation into a double-quoted HTML attribute
 * or inline style value. Prevents attribute breakout from untrusted input.
 */
export function escapeAttr(value: unknown): string {
    return String(value ?? '').replace(ATTR_PATTERN, char => HTML_ESCAPES[char]);
}
