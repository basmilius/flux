const HUES: Record<string, number> = {
    primary: 220,
    info: 200,
    success: 150,
    warning: 38,
    danger: 352,
    gray: 230
};

// Generates a self-contained gradient cover as an SVG data URI, so the demo needs
// no network for imagery (galleries, covers, focal-point previews, pane media).
export function coverImage(label: string, color = 'primary'): string {
    const hue = HUES[color] ?? 220;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 68% 56%)"/><stop offset="1" stop-color="hsl(${(hue + 40) % 360} 64% 44%)"/></linearGradient></defs><rect width="480" height="300" fill="url(#g)"/><circle cx="380" cy="70" r="120" fill="rgba(255,255,255,0.12)"/><circle cx="90" cy="250" r="90" fill="rgba(0,0,0,0.10)"/><text x="24" y="280" fill="rgba(255,255,255,0.9)" font-family="sans-serif" font-size="18" font-weight="600">${label}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
