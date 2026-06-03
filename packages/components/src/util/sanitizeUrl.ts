const DANGEROUS_PROTOCOL = /^(javascript|vbscript|data):/i;

/**
 * Removes control characters (and the Unicode line/paragraph separators) that
 * browsers ignore inside URLs but which can be used to obfuscate the scheme,
 * e.g. `java\tscript:alert(1)`.
 */
function stripControlChars(value: string): string {
    let out = '';

    for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i);

        if (code <= 0x20 || (code >= 0x7f && code <= 0x9f) || code === 0x2028 || code === 0x2029) {
            continue;
        }

        out += value[i];
    }

    return out;
}

/**
 * Sanitizes a URL intended for an `href` attribute. Returns `undefined` when the
 * URL uses a dangerous scheme (`javascript:`, `vbscript:`, `data:`) so the attribute
 * is omitted instead of becoming a script-execution or data-injection vector.
 * Safe and relative URLs are returned unchanged.
 */
export default function (href?: string): string | undefined {
    if (!href) {
        return href;
    }

    if (DANGEROUS_PROTOCOL.test(stripControlChars(href))) {
        return undefined;
    }

    return href;
}
