import { useState } from 'react';
import { FluxFlowPill, type FluxColor, type FluxIconName } from '@flux-ui/react';
import { useEffect } from 'react';
export default function Example() {
    const STAGES: {
        readonly icon: FluxIconName;
        readonly label: string;
    }[] = [
        { icon: 'database', label: 'Fetch orders' },
        { icon: 'wand-magic-sparkles', label: 'Enrich records' },
        { icon: 'paper-plane', label: 'Publish' }
    ];
    const [running, setRunning] = useState(0);
    let interval = 0;
    function colorOf(index: number): FluxColor {
        if (index < running) {
            return 'success';
        }
        return index === running ? 'primary' : 'gray';
    }
    function iconOf(index: number, icon: FluxIconName): FluxIconName {
        return index < running ? 'circle-check' : icon;
    }
    useEffect(() => {
        (() => {
            interval = window.setInterval(
                () => setRunning((value) => (value + 1) % (STAGES.length + 1)),
                1600
            );
        })();
        return () => (() => clearInterval(interval))();
    }, []);
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    padding: '12px 0'
                }}
            >
                {STAGES.map((stage, index) => (
                    <FluxFlowPill
                        key={stage.label}
                        color={colorOf(index)}
                        icon={iconOf(index, stage.icon)}
                        label={stage.label}
                        isLoading={index === running}
                    ></FluxFlowPill>
                ))}
            </div>
        </>
    );
}
