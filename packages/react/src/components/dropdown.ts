import {useEffect, useLayoutEffect, useRef, useState} from 'react';

export function useDropdownPopup(disabled: boolean, readonly = false, autoFocus = false) {
    const anchor = useRef<HTMLDivElement>(null);
    const search = useRef<HTMLInputElement>(null);
    const [popup, setPopup] = useState<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0, width: 0});
    useEffect(() => {if (autoFocus) anchor.current?.focus();}, [autoFocus]);
    useEffect(() => {if (disabled || readonly) setOpen(false);}, [disabled, readonly]);
    useLayoutEffect(() => {
        if (!open || !popup) return;
        const reposition = () => {
            const box = anchor.current?.getBoundingClientRect();
            if (!box) return;
            const height = popup.offsetHeight;
            let y = box.bottom + 12;
            if (y + height + 12 > innerHeight) y = box.top - height - 12;
            if (y < 0 || y + height > innerHeight) y = (innerHeight - height) / 2;
            setPosition(current => current.x === box.x && current.y === y && current.width === box.width ? current : {x: box.x, y, width: box.width});
        };
        reposition();
        const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(reposition);
        if (anchor.current) observer?.observe(anchor.current);
        observer?.observe(popup);
        window.addEventListener('resize', reposition);
        window.addEventListener('scroll', reposition, true);
        return () => {observer?.disconnect(); window.removeEventListener('resize', reposition); window.removeEventListener('scroll', reposition, true);};
    }, [open, popup]);
    useEffect(() => {
        if (!open || !popup) return;
        (search.current ?? anchor.current)?.focus({preventScroll: true});
        const outside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!anchor.current?.contains(target) && !popup.contains(target)) setOpen(false);
            else if (popup.contains(target)) (search.current ?? anchor.current)?.focus({preventScroll: true});
        };
        document.addEventListener('click', outside);
        return () => document.removeEventListener('click', outside);
    }, [open, popup]);
    return {anchor, search, popup, setPopup, open, setOpen, position, toggle: () => {if (!disabled && !readonly) setOpen(value => !value);}};
}
