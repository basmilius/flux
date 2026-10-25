export type PopupPosition = 'top' | 'top-left' | 'top-right' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom' | 'bottom' | 'bottom-left' | 'bottom-right';

export function positionPopup(anchor: Pick<DOMRect, 'x' | 'y' | 'width' | 'height'>, popup: Pick<DOMRect, 'width' | 'height'>, position: PopupPosition | undefined, margin = 2, viewport = {width: innerWidth, height: innerHeight}, direction: 'horizontal' | 'vertical' = 'vertical') {
    if (!position) {
        let x = direction === 'horizontal' ? anchor.x + anchor.width + margin : anchor.x + (anchor.width - popup.width) / 2;
        let y = direction === 'horizontal' ? anchor.y + (anchor.height - popup.height) / 2 : anchor.y + anchor.height + margin;
        if (direction === 'horizontal' && x + popup.width > viewport.width) x = anchor.x - popup.width - margin;
        if (direction === 'vertical' && y + popup.height + margin > viewport.height) y = anchor.y - popup.height - margin;
        if (y < 0 || y + popup.height > viewport.height) y = (viewport.height - popup.height) / 2;
        return {x: Math.min(Math.max(x, margin), Math.max(margin, viewport.width - popup.width - margin)), y: Math.min(Math.max(y, margin), Math.max(margin, viewport.height - popup.height - margin))};
    }
    const [side, align] = position.split('-');
    let x = anchor.x;
    let y = anchor.y;
    if (side === 'top' || side === 'bottom') {
        y += side === 'top' ? -popup.height - margin : anchor.height + margin;
        x += align === 'left' ? 0 : align === 'right' ? anchor.width - popup.width : (anchor.width - popup.width) / 2;
        if (side === 'bottom' && y + popup.height > viewport.height - margin) y = anchor.y - popup.height - margin;
        else if (side === 'top' && y < margin) y = anchor.y + anchor.height + margin;
    } else {
        x += side === 'left' ? -popup.width - margin : anchor.width + margin;
        y += align === 'top' ? 0 : align === 'bottom' ? anchor.height - popup.height : (anchor.height - popup.height) / 2;
        if (side === 'right' && x + popup.width > viewport.width - margin) x = anchor.x - popup.width - margin;
        else if (side === 'left' && x < margin) x = anchor.x + anchor.width + margin;
    }
    return {x: Math.min(Math.max(x, margin), Math.max(margin, viewport.width - popup.width - margin)), y: Math.min(Math.max(y, margin), Math.max(margin, viewport.height - popup.height - margin))};
}
