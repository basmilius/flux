import { useState } from 'react';
import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/react';
import { useEffect } from 'react';
export default function Example() {
    const [progress, setProgress] = useState(0);
    let frame = 0;
    useEffect(() => {
        (() => {
            const start = performance.now();
            const tick = (now: number) => {
                setProgress(((now - start) / 2400) % 1);
                frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
        })();
        return () => (() => cancelAnimationFrame(frame))();
    }, []);
    return (
        <>
            <FluxFlow padding={21}>
                <FluxFlowNode id={'extract'} x={0} y={0}>
                    <FluxFlowActionCard
                        title={'Extract'}
                        label={'Running'}
                        icon={'gauge'}
                        color={'primary'}
                        active
                    ></FluxFlowActionCard>
                </FluxFlowNode>
                <FluxFlowNode id={'load'} x={0} y={180}>
                    <FluxFlowActionCard title={'Load'}></FluxFlowActionCard>
                </FluxFlowNode>
                <FluxFlowConnection
                    from={'extract'}
                    to={'load'}
                    progressColor={'primary'}
                    progressValue={progress}
                ></FluxFlowConnection>
            </FluxFlow>
        </>
    );
}
