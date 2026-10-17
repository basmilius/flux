import {ReactPreview} from '../../../../../.vitepress/react/Preview';
import { FluxSnackbar } from '@flux-ui/react';
export default function Example() {
    return (
        <>
            <ReactPreview>
                <FluxSnackbar
                    actions={{ update: 'Update', later: 'Later' }}
                    icon={'circle-arrow-up'}
                    message={'A new version of macOS is available.'}
                    title={'Update available'}
                ></FluxSnackbar>
            </ReactPreview>
        </>
    );
}
