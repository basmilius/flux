import {useLayoutEffect, useState} from 'react';

export function useHeightTransition() {
    const [element, setElement] = useState<HTMLElement | null>(null);
    useLayoutEffect(() => element ? observeHeightTransition(element) : undefined, [element]);
    return setElement;
}

export function observeHeightTransition(element: HTMLElement) {
    let frame = 0;
    const update = () => {
        cancelAnimationFrame(frame);
        const current = getComputedStyle(element).height;
        element.style.height = 'auto';
        const height = getComputedStyle(element).height;
        element.style.height = current;
        if (height !== current) {
            getComputedStyle(element).height;
            frame = requestAnimationFrame(() => {element.style.height = height;});
        }
    };
    const observer = new MutationObserver(update);
    observer.observe(element, {childList: true, subtree: true});
    frame = requestAnimationFrame(update);
    return () => {observer.disconnect(); cancelAnimationFrame(frame);};
}
