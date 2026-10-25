import { type ComponentRef, useRef } from 'react';
import { FluxSecondaryButton, FluxVisualSlotText } from '@flux-ui/react';
export default function Example() {
    const labelRef = useRef<ComponentRef<typeof FluxVisualSlotText> | null>(null);
    function copy(): void {
        labelRef.current?.flash('Copied', {enter: {direction: 'up'}});
    }
    return <FluxSecondaryButton iconLeading="copy" onClick={copy}>
        <FluxVisualSlotText ref={labelRef} text="Copy"/>
    </FluxSecondaryButton>;
}
