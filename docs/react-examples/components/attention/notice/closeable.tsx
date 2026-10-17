import { FluxNotice } from '@flux-ui/react';
import { useEffect, useState } from 'react';
export default function Example() {
    const [isVisible, setVisible] = useState(true);
    useEffect(() => {
        if (isVisible) return;
        const timeout = setTimeout(() => setVisible(true), 3000);
        return () => clearTimeout(timeout);
    }, [isVisible]);
    function onClose() {
        setVisible(false);
    }
    return (
        <>
            {isVisible ? (
                <FluxNotice
                    color={'info'}
                    icon={'circle-info'}
                    message={"You can dismiss this notice when you're done reading it."}
                    isCloseable
                    onClose={onClose}
                ></FluxNotice>
            ) : null}
        </>
    );
}
