import { useState } from 'react';
import {
    FluxBadge,
    FluxFlow,
    FluxFlowActionCard,
    FluxFlowConnection,
    FluxFlowNode,
    FluxFlowPill,
    type FluxColor,
    type FluxIconName
} from '@flux-ui/react';
import { useEffect } from 'react';
export default function Example() {
    const STAGES: {
        readonly id: string;
        readonly icon: FluxIconName;
        readonly title: string;
        readonly subtitle: string;
        readonly description: string;
    }[] = [
        {
            id: 'fetch',
            icon: 'database',
            title: 'Fetch orders',
            subtitle: 'Shopify API',
            description: 'Pulls every order created since the last successful run.'
        },
        {
            id: 'enrich',
            icon: 'wand-magic-sparkles',
            title: 'Enrich records',
            subtitle: 'Customer service',
            description: 'Adds customer, currency and tax data to each order.'
        },
        {
            id: 'load',
            icon: 'server',
            title: 'Load into warehouse',
            subtitle: 'BigQuery',
            description: 'Writes the enriched batch and marks the run as complete.'
        }
    ];
    const STEPS = STAGES.length + 1;
    const STEP_DURATION = 1400;
    const HOLD = 1;
    const IDLE = 0.6;
    const [elapsed, setElapsed] = useState(0);
    let frame = 0;
    function isRunning(step: number): boolean {
        return elapsed >= step && elapsed < step + 1;
    }
    function isDone(step: number): boolean {
        return elapsed >= step + 1;
    }
    function colorOf(step: number): FluxColor {
        if (isDone(step)) {
            return 'success';
        }
        return isRunning(step) ? 'primary' : 'gray';
    }
    function labelOf(step: number): string {
        if (isDone(step)) {
            return 'Done';
        }
        return isRunning(step) ? 'Running' : 'Pending';
    }
    function progressOf(step: number): number {
        return Math.min(Math.max(elapsed - step + 1, 0), 1);
    }
    useEffect(() => {
        (() => {
            const start = performance.now();
            const tick = (now: number) => {
                setElapsed((((now - start) / STEP_DURATION) % (STEPS + HOLD + IDLE)) - IDLE);
                frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
        })();
        return () => (() => cancelAnimationFrame(frame))();
    }, []);
    return (
        <>
            <FluxFlow padding={21}>
                <FluxFlowNode id={'trigger'} x={81} y={0}>
                    <FluxFlowPill
                        color={'info'}
                        icon={'bolt'}
                        label={'Nightly sync'}
                        isLoading={isRunning(0)}
                    ></FluxFlowPill>
                </FluxFlowNode>
                {STAGES.map((stage, index) => (
                    <FluxFlowNode key={stage.id} id={stage.id} x={0} y={120 + index * 270}>
                        <FluxFlowActionCard
                            title={stage.title}
                            subtitle={stage.subtitle}
                            icon={isDone(index + 1) ? 'circle-check' : stage.icon}
                            color={colorOf(index + 1)}
                            active={isRunning(index + 1)}
                            isLoading={isRunning(index + 1)}
                            footer={
                                <>
                                    <FluxBadge
                                        color={colorOf(index + 1)}
                                        label={labelOf(index + 1)}
                                    ></FluxBadge>
                                </>
                            }
                        >
                            {stage.description}
                        </FluxFlowActionCard>
                    </FluxFlowNode>
                ))}
                <FluxFlowConnection
                    from={'trigger'}
                    to={'fetch'}
                    fromAlign={'start'}
                    progressColor={'primary'}
                    progressValue={progressOf(1)}
                ></FluxFlowConnection>
                <FluxFlowConnection
                    from={'fetch'}
                    to={'enrich'}
                    progressColor={'primary'}
                    progressValue={progressOf(2)}
                ></FluxFlowConnection>
                <FluxFlowConnection
                    from={'enrich'}
                    to={'load'}
                    progressColor={'primary'}
                    progressValue={progressOf(3)}
                ></FluxFlowConnection>
            </FluxFlow>
        </>
    );
}
