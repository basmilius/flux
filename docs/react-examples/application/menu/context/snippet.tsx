import { FluxApplicationMenuContext } from '@flux-ui/react';
export default function Example() {
    return (
        <>
            <FluxApplicationMenuContext
                title={'Project Aurora'}
                subtitle={'Settings'}
                to={{ pathname: '/projects' }}
            ></FluxApplicationMenuContext>
        </>
    );
}
