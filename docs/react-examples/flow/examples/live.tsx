import { useState } from 'react';
import {
    FluxFlow,
    FluxFlowActionCard,
    FluxFlowConnection,
    FluxFlowNode,
    FluxFlowTriggerCard,
    FluxPrimaryButton,
    FluxStatisticsMeter
} from '@flux-ui/react';
import { useEffect } from 'react';
export default function Example() {
    const STAGES = 3;
    const STAGE_DURATION = 800;
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    const handoff = (() => clamp(elapsed))();
    const build = (() => clamp(elapsed - 1))();
    const release = (() => clamp(elapsed - 2))();
    const building = (() => elapsed > 1 && elapsed < 2)();
    const done = (() => elapsed >= STAGES)();
    function clamp(value: number): number {
        return Math.min(Math.max(value, 0), 1);
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
            const next = Math.min((now - start) / STAGE_DURATION, STAGES);
            setElapsed(next);
            if (next < STAGES) frame = requestAnimationFrame(tick);
            else setRunning(false);
        }
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [running]);
    return (
        <>
            <div style={{ height: '390px' }}>
                <FluxFlow padding={21} interactive background={'dots'}>
                    <FluxFlowNode id={'trigger'} x={0} y={60}>
                        <FluxFlowTriggerCard
                            title={'Deploy requested'}
                            subtitle={'main branch'}
                            footer={
                                <>
                                    <FluxPrimaryButton
                                        iconLeading={'play'}
                                        label={running ? 'Running' : 'Run'}
                                        isLoading={running}
                                        disabled={running}
                                        onClick={run}
                                    ></FluxPrimaryButton>
                                </>
                            }
                        ></FluxFlowTriggerCard>
                    </FluxFlowNode>
                    <FluxFlowNode id={'build'} x={360} y={78}>
                        <FluxFlowActionCard
                            title={'Build image'}
                            icon={'server'}
                            color={'primary'}
                            active={building}
                        >
                            <FluxStatisticsMeter
                                color={'primary'}
                                icon={'gauge-high'}
                                title={'Progress'}
                                value={build}
                            ></FluxStatisticsMeter>
                        </FluxFlowActionCard>
                    </FluxFlowNode>
                    <FluxFlowNode id={'ship'} x={720} y={74}>
                        <FluxFlowActionCard
                            title={'Ship to production'}
                            icon={'circle-check'}
                            color={'success'}
                            active={done}
                        >
                            {' Rolls the new image out to production. '}
                        </FluxFlowActionCard>
                    </FluxFlowNode>
                    <FluxFlowConnection
                        from={'trigger'}
                        to={'build'}
                        fromSide={'right'}
                        toSide={'left'}
                        progressColor={'primary'}
                        progressValue={handoff}
                    ></FluxFlowConnection>
                    <FluxFlowConnection
                        from={'build'}
                        to={'ship'}
                        fromSide={'right'}
                        toSide={'left'}
                        progressColor={'success'}
                        progressValue={release}
                    ></FluxFlowConnection>
                </FluxFlow>
            </div>
        </>
    );
}
