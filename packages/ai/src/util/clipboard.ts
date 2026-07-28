/**
 * Copies the text to the clipboard and tells whether that succeeded. The write is
 * rejected by the browser outside a user gesture and on an insecure origin, so a
 * caller only confirms the copy when this resolves to `true`.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);

        return true;
    } catch {
        return false;
    }
}
