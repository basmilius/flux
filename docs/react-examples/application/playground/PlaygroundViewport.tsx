import { FluxButtonStack, FluxSecondaryButton } from '@flux-ui/react';
import { useEffect, useRef, useState } from 'react';
export default function PlaygroundViewport({
    height,
    path,
    title
}: {
    height: number;
    path: string;
    title: string;
}) {
    const container = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number | null>(null);
    const [maximum, setMaximum] = useState(1440);
    useEffect(() => {
        const element = container.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) =>
            setMaximum(Math.max(321, entry.contentRect.width))
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    const effectiveWidth = Math.min(width ?? maximum, maximum);
    return (
        <section
            ref={container}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}
        >
            <FluxButtonStack>
                {[321, 640, 768, 1024, 1280].map((value) => (
                    <FluxSecondaryButton
                        key={value}
                        label={String(value)}
                        onClick={() => setWidth(value)}
                    />
                ))}
                <FluxSecondaryButton label="Full width" onClick={() => setWidth(null)} />
            </FluxButtonStack>
            <label style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                Viewport: {Math.round(effectiveWidth)} px
                <input
                    aria-label={`${title} viewport width`}
                    type="range"
                    min={321}
                    max={maximum}
                    step={1}
                    value={effectiveWidth}
                    onChange={(event) => setWidth(Number(event.target.value))}
                    style={{ flex: 1 }}
                />
            </label>
            <iframe
                title={title}
                src={`/react${path}`}
                style={{
                    border: '1px solid var(--surface-stroke)',
                    borderRadius: 12,
                    height,
                    width: effectiveWidth,
                    maxWidth: '100%',
                    background: 'var(--surface)'
                }}
            />
        </section>
    );
}
