import { iconRegistry } from '@flux-ui/components';
import type { FluxIconName } from '@flux-ui/types';
import { escapeAttr } from './html';

export function renderIconSvg(name: FluxIconName | undefined, color: string, size: number = 14): string {
    if (!name) {
        return '';
    }

    const icon = iconRegistry[name];

    if (!icon) {
        return '';
    }

    const [width, height, , , pathData] = icon;
    const paths = Array.isArray(pathData) ? pathData : [pathData];
    const safeColor = escapeAttr(color);
    const pathElements = paths.map(d => `<path d="${escapeAttr(d)}" fill="${safeColor}"/>`).join('');

    return `<svg viewBox="0 0 ${width} ${height}" width="${size}" height="${size}" focusable="false" aria-hidden="true">${pathElements}</svg>`;
}
