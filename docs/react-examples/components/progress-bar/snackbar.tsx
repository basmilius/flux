import { FluxSnackbar } from '@flux-ui/react';
export default function Example() {
    return (
        <>
            <FluxSnackbar
                progressStatus={'Fetching Flux packages...'}
                progressValue={0.75}
                icon={'arrow-down-to-line'}
                message={'Downloading the new version of Flux.'}
                title={'Flux update'}
            ></FluxSnackbar>
        </>
    );
}
