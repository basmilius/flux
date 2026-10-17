import { FluxToggle, FluxFlowEdgeLayerInjectionKey } from '@flux-ui/react';
import { useState, type ReactNode } from 'react';
export default function PlaygroundStage({
    children,
    title,
    tall
}: {
    children?: ReactNode;
    title?: string;
    tall?: boolean;
}) {
    const [under, setUnder] = useState(true);
    return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {title && <h3>{title}</h3>}
                <label style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <FluxToggle checked={under} onCheckedChange={setUnder} /> Under cards
                </label>
            </div>
            <div
                style={{
                    border: '1px solid var(--surface-stroke)',
                    borderRadius: 12,
                    overflow: 'hidden',
                    padding: tall ? 0 : 15,
                    height: tall ? '72vh' : undefined,
                    minHeight: tall ? 480 : undefined
                }}
            >
                <FluxFlowEdgeLayerInjectionKey.Provider value={under ? 'under' : 'over'}>
                    {children}
                </FluxFlowEdgeLayerInjectionKey.Provider>
            </div>
        </section>
    );
}
