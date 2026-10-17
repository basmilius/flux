import { useState } from 'react';
import { FluxFlowActionCard, FluxStatisticsMeter } from '@flux-ui/react';
import { useEffect } from 'react';
export default function Example() {
    const [progress, setProgress] = useState(0);
    let frame = 0;
    useEffect(() => {
        (() => {
            const start = performance.now();
            const tick = (now: number) => {
                setProgress(((now - start) / 3200) % 1);
                frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
        })();
        return () => (() => cancelAnimationFrame(frame))();
    }, []);
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
                <FluxFlowActionCard title={'Build image'} icon={'server'} color={'primary'} active>
                    <FluxStatisticsMeter
                        color={'primary'}
                        icon={'gauge-high'}
                        title={'Progress'}
                        value={progress}
                    ></FluxStatisticsMeter>
                </FluxFlowActionCard>
            </div>
        </>
    );
}
