import { useState } from 'react';
import { FluxFlex, FluxPane, FluxPaneBody, FluxVisualNumberFlow } from '@flux-ui/react';
import { useEffect } from 'react';
export default function Example() {
    const format: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    };
    const [value, setValue] = useState(84500);
    let timer: number;
    function tick(): void {
        setValue((value) => value + Math.floor(Math.random() * 900));
    }
    useEffect(() => {
        (() => {
            timer = window.setInterval(tick, 2500);
        })();
        return () => (() => window.clearInterval(timer))();
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
                            {'Monthly revenue'}
                        </span>
                        <FluxVisualNumberFlow
                            format={format}
                            value={value}
                            style={{ fontSize: '33px', fontWeight: '700' }}
                        ></FluxVisualNumberFlow>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </>
    );
}
