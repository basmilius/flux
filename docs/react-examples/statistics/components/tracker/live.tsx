import { useState } from 'react';
import {
    FluxBadge,
    FluxFlex,
    FluxSecondaryButton,
    FluxStatisticsTracker,
    FluxStatisticsTrackerEntry,
    FluxStatisticsTrackerLabel,
    FluxStatisticsTrackerStep,
    FluxStatisticsTrackerSteps
} from '@flux-ui/react';
import { useEffect } from 'react';
export default function Example() {
    const STEPS = [
        'Shipping label generated',
        'Packing in progress',
        'Handed to carrier',
        'Out for delivery'
    ];
    const STEP_DURATION = 900;
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(true);
    const isDelivered = (() => elapsed >= STEPS.length)();
    function stateOf(index: number): 'active' | 'done' | 'pending' {
        if (elapsed >= index + 1) {
            return 'done';
        }
        return elapsed > index ? 'active' : 'pending';
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
                <FluxStatisticsTracker>
                    <FluxStatisticsTrackerLabel
                        color={'success'}
                        label={'Completed'}
                    ></FluxStatisticsTrackerLabel>
                    <FluxStatisticsTrackerEntry
                        color={'success'}
                        icon={'circle-check'}
                        title={'Order placed'}
                        when={'Mar 8, 2026 · 09:12 am'}
                    ></FluxStatisticsTrackerEntry>
                    <FluxStatisticsTrackerLabel
                        color={isDelivered ? 'success' : 'primary'}
                        label={isDelivered ? 'Completed' : 'In-progress'}
                    ></FluxStatisticsTrackerLabel>
                    <FluxStatisticsTrackerEntry
                        icon={'truck'}
                        title={'Shipment 1'}
                        color={isDelivered ? 'success' : 'primary'}
                        end={
                            <>
                                <FluxBadge
                                    colored
                                    color={isDelivered ? 'success' : 'primary'}
                                    label={isDelivered ? 'Delivered' : 'In Progress'}
                                ></FluxBadge>
                            </>
                        }
                    >
                        <FluxStatisticsTrackerSteps>
                            {STEPS.map((step, index) => (
                                <FluxStatisticsTrackerStep
                                    key={step}
                                    label={step}
                                    state={stateOf(index)}
                                ></FluxStatisticsTrackerStep>
                            ))}
                        </FluxStatisticsTrackerSteps>
                    </FluxStatisticsTrackerEntry>
                    {isDelivered ? (
                        <FluxStatisticsTrackerEntry
                            icon={'house'}
                            title={'Delivery'}
                            description={'Handed to the customer'}
                        ></FluxStatisticsTrackerEntry>
                    ) : null}
                </FluxStatisticsTracker>
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
