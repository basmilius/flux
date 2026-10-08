import {
    FluxPane,
    FluxPaneBody,
    FluxPaneHeader,
    FluxPrimaryButton,
    FluxOverlay
} from '@flux-ui/react';
import { useEffect, useState } from 'react';
export default function Example() {
    const [open, setOpen] = useState(() => window.location.hash === '#react-overlay');
    useEffect(() => {
        const sync = () => setOpen(window.location.hash === '#react-overlay');
        window.addEventListener('hashchange', sync);
        return () => window.removeEventListener('hashchange', sync);
    }, []);
    return (
        <>
            <FluxPrimaryButton
                label="Open from URL"
                onClick={() => {
                    window.location.hash = 'react-overlay';
                }}
            />
            <FluxOverlay open={open} onClose={() => window.history.back()}>
                <FluxPane>
                    <FluxPaneHeader title="URL-controlled view" />
                    <FluxPaneBody>
                        Use the browser Back button or close this view to return.
                    </FluxPaneBody>
                </FluxPane>
            </FluxOverlay>
        </>
    );
}
