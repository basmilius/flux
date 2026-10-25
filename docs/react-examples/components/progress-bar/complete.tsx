import { FluxPane, FluxPaneBody, FluxProgressBar } from '@flux-ui/react';
import { useEffect, useState } from 'react';
export default function Example() {
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState('Preparing...');
    useEffect(() => {
        const start = performance.now();
        const timer = setInterval(() => {
            const phase = (performance.now() - start) % 6500;
            const progress = Math.min(Math.max((phase - 600) / 4200, 0), 1);
            setValue(progress);
            setStatus(
                phase < 600
                    ? 'Preparing...'
                    : progress < 0.7
                      ? 'Downloading...'
                      : progress < 1
                        ? 'Unzipping...'
                        : 'Done.'
            );
        }, 50);
        return () => clearInterval(timer);
    }, []);
    return (
        <>
            <FluxPane>
                <FluxPaneBody>
                    <FluxProgressBar status={status} value={value}></FluxProgressBar>
                </FluxPaneBody>
            </FluxPane>
        </>
    );
}
