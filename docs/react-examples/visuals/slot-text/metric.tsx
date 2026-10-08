import { FluxFlex, FluxPane, FluxPaneBody, FluxVisualSlotText } from '@flux-ui/react';
import { useState, useEffect } from 'react';
export default function Example() {
    const [count, setCount] = useState(12483);
    const value = count.toLocaleString('en-US');
    useEffect(() => {
        const timer = setInterval(
            () => setCount((current) => current + Math.floor(Math.random() * 25) - 8),
            2000
        );
        return () => clearInterval(timer);
    }, []);
    return (
        <>
            <FluxPane style={{ width: '261px' }}>
                <FluxPaneBody>
                    <FluxFlex align={'start'} direction={'vertical'} gap={3}>
                        <span
                            style={{
                                color: 'var(--foreground-secondary)',
                                fontSize: '13px',
                                fontWeight: '500'
                            }}
                        >
                            {'Active users'}
                        </span>
                        <FluxVisualSlotText direction="up" text={value}
                            style={{
                                fontSize: '33px',
                                fontWeight: '700',
                                fontVariantNumeric: 'tabular-nums'
                            }}
                        />
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </>
    );
}
