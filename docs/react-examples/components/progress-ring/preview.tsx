import {ReactPreview} from '../../../../.vitepress/react/Preview';
import { FluxProgressRing, FluxText } from '@flux-ui/react';
export default function Example() {
    return (
        <>
            <ReactPreview>
                <FluxProgressRing label={'Storage used'} size={84} value={0.68}>
                    {(progress) => (
                        <>
                            <FluxText weight={600}>{progress}</FluxText>
                        </>
                    )}
                </FluxProgressRing>
            </ReactPreview>
        </>
    );
}
