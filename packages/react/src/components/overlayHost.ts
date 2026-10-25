import {useLayoutEffect, useState} from 'react';
import styles from '../../../components/src/css/component/Overlay.module.scss';

let host: {element: HTMLDivElement; shade: HTMLDivElement; users: number} | undefined;

export function useOverlayHost() {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        if (!host) {
            const element = document.createElement('div');
            const shade = document.createElement('div');
            element.className = styles.overlayProvider;
            shade.className = styles.overlayShade;
            element.append(shade);
            document.body.append(element);
            host = {element, shade, users: 0};
        }
        const current = host;
        current.users++;
        setElement(current.element);
        return () => {
            if (--current.users === 0) {
                current.element.remove();
                if (host === current) host = undefined;
            }
        };
    }, []);
    return element;
}

export function setOverlayShadeOpacity(opacity: number) {
    if (!host) return;
    host.shade.style.setProperty('--overlay-shade-opacity', String(opacity));
    host.shade.style.transition = opacity < 1 ? 'none' : '';
}
