import { useState } from 'react';
import {
    FluxFlex,
    FluxSecondaryButton,
    FluxStatisticsTrackerCard,
    FluxStatisticsTrackerCardSegment
} from '@flux-ui/react';
import { useEffect } from 'react';
export default function Example() {
    const STEPS = ['Ordered', 'Packed', 'Shipped', 'Out for delivery', 'Delivered'];
    const STEP_DURATION = 900;
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(true);
    const subtitle = (() => {
        const index = Math.min(Math.floor(elapsed), STEPS.length - 1);
        return elapsed >= STEPS.length
            ? 'Delivered · Thank you for your order'
            : `Step ${index + 1} of ${STEPS.length} · ${STEPS[index]}`;
    })();
    function clamp(value: number): number {
        return Math.min(Math.max(value, 0), 1);
    }
    function stateOf(index: number): 'active' | 'done' | 'todo' {
        if (elapsed >= index + 1) {
            return 'done';
        }
        return elapsed > index ? 'active' : 'todo';
    }
    function valueOf(index: number): number {
        return clamp(elapsed - index);
    }
    function run() {
        setElapsed(0);
        setRunning(true);
    }
    useEffect(() => {
        if (!running) return;
        const start = performance.now();
        let frame = 0;
        function tick(now: number) {
            const next = Math.min((now - start) / STEP_DURATION, STEPS.length);
            setElapsed(next);
            if (next < STEPS.length) frame = requestAnimationFrame(tick);
            else setRunning(false);
        }
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [running]);
    return (
        <>
            <FluxFlex direction={'vertical'} gap={18} style={{ width: '100%', maxWidth: '450px' }}>
                <FluxStatisticsTrackerCard
                    title={'Your Order is on the Way'}
                    subtitle={subtitle}
                    icon={'truck'}
                >
                    {STEPS.map((step, index) => (
                        <FluxStatisticsTrackerCardSegment
                            key={step}
                            label={step}
                            state={stateOf(index)}
                            min={0}
                            max={1}
                            value={valueOf(index)}
                        ></FluxStatisticsTrackerCardSegment>
                    ))}
                </FluxStatisticsTrackerCard>
                <FluxSecondaryButton
                    iconLeading={'play'}
                    label={running ? 'Running' : 'Run again'}
                    isLoading={running}
                    disabled={running}
                    onClick={run}
                ></FluxSecondaryButton>
            </FluxFlex>
        </>
    );
}
