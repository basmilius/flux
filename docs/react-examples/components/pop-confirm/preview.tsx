import {ReactPreview} from '../../../../.vitepress/react/Preview';
import { useState } from 'react';
import { FluxPopConfirm, FluxSecondaryButton } from '@flux-ui/react';
export default function Example() {
    const [confirmed, setConfirmed] = useState(false);
    return (
        <>
            <ReactPreview>
                <FluxPopConfirm
                    onConfirm={() => {
                        setConfirmed(true);
                    }}
                    confirmLabel={'Delete'}
                    icon={'trash'}
                    isDestructive
                    message={'Delete this invoice? This cannot be undone.'}
                    opener={({ toggle }) => (
                        <>
                            <FluxSecondaryButton
                                iconLeading={'trash'}
                                label={'Delete invoice'}
                                onClick={() => {
                                    toggle();
                                }}
                            ></FluxSecondaryButton>
                            {confirmed ? <p>{'Item deleted.'}</p> : null}
                        </>
                    )}
                ></FluxPopConfirm>
            </ReactPreview>
        </>
    );
}
