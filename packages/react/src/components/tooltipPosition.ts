import type {FluxDirection, FluxStyle} from '../types';

export function positionTooltip(anchor: Pick<DOMRect, 'top' | 'left' | 'width' | 'height'>, tooltip: Pick<DOMRect, 'width' | 'height'>, direction: FluxDirection, viewport = {width: innerWidth, height: innerHeight}): {side: string; style: FluxStyle} {
    const margin = 9;
    const safeZone = 15;
    let x: number, y: number, side: string, arrowAngle: string;
    let arrowX = '50%', arrowY = '50%';
    if (direction === 'horizontal') {
        const before = anchor.left > viewport.width / 2;
        x = before ? anchor.left - tooltip.width - margin : anchor.left + anchor.width + margin;
        y = anchor.top + (anchor.height - tooltip.height) / 2;
        side = before ? 'Start' : 'End';
        arrowAngle = before ? '315deg' : '135deg';
        arrowX = before ? '100%' : '0';
        if (y + tooltip.height > viewport.height - safeZone) {
            const diff = Math.min(y, viewport.height - tooltip.height - safeZone) - y;
            arrowY = `calc(50% - ${diff}px)`;
            y += diff;
        }
        if (y < safeZone) {
            const diff = Math.max(y, safeZone) - y;
            arrowY = `calc(50% - ${diff}px)`;
            y += diff;
        }
    } else {
        const above = anchor.top > 300;
        x = anchor.left + (anchor.width - tooltip.width) / 2;
        y = above ? anchor.top - tooltip.height - margin : anchor.top + anchor.height + margin;
        side = above ? 'Above' : 'Below';
        arrowAngle = above ? '45deg' : '225deg';
        arrowY = above ? '100%' : '0';
        if (x + tooltip.width > viewport.width - safeZone) {
            const diff = Math.min(x, viewport.width - tooltip.width - safeZone) - x;
            arrowX = `calc(50% - ${diff}px)`;
            x += diff;
        }
        if (x < safeZone) {
            const diff = Math.max(x, safeZone) - x;
            arrowX = `calc(50% - ${diff}px)`;
            x += diff;
        }
    }
    return {side, style: {'--x': Math.round(x), '--y': Math.round(y), '--arrowX': arrowX, '--arrowY': arrowY, '--arrowAngle': arrowAngle}};
}
