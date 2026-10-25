import { FluxVisualGridPattern } from '@flux-ui/react';
import { clsx } from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import styles from '../theme/Preview.module.scss';

export function ReactFluxView({ className, ...props }: HTMLAttributes<HTMLElement>) {
    return <section {...props} className={clsx(styles.fluxView, className)} data-flux />;
}

export function ReactPreviewColumn({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(styles.previewColumn, className)} />;
}

export function ReactPreview({ body, children, className, flush, style, ...props }: HTMLAttributes<HTMLDivElement> & { body?: ReactNode; flush?: boolean }) {
    const root = useRef<HTMLDivElement>(null);
    const [minHeight, setMinHeight] = useState(0);
    useLayoutEffect(() => {
        if (!root.current) return;
        const rows = Math.ceil(root.current.getBoundingClientRect().height / 42) + 1;
        setMinHeight(Math.max(6, rows) * 42);
        const frame = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
        return () => cancelAnimationFrame(frame);
    }, []);
    return (
        <div {...props} ref={root} className={clsx(styles.preview, className)} style={{ ...style, '--preview-min-height': minHeight } as CSSProperties}>
            <FluxVisualGridPattern strokeDasharray="3" />
            {body ?? <ReactFluxView className={clsx(styles.previewBody, flush && styles.isFlush)}>{children}</ReactFluxView>}
        </div>
    );
}
