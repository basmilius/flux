import { FluxVisualSlotText } from '@flux-ui/react';
import { useState, useEffect } from 'react';
export default function Example() {
    const [time, setTime] = useState(() =>
        new Date().toLocaleTimeString('en-US', { hour12: false })
    );
    useEffect(() => {
        const timer = setInterval(
            () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false })),
            1000
        );
        return () => clearInterval(timer);
    }, []);
    return (
        <>
            <div
                style={{
                    fontSize: '39px',
                    fontWeight: '700',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.02em'
                }}
            >
                <FluxVisualSlotText direction={'up'} text={time}></FluxVisualSlotText>
            </div>
        </>
    );
}
