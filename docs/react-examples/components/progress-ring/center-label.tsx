import { FluxFlex, FluxProgressRing, FluxText } from '@flux-ui/react';
export default function Example() {
    return (
        <>
            <FluxProgressRing
                color={'success'}
                label={'Profile completeness'}
                size={102}
                thickness={9}
                value={0.8}
            >
                {(progress) => (
                    <>
                        <FluxFlex align={'center'} direction={'vertical'} gap={0}>
                            <FluxText size={'large'} weight={600}>
                                {progress}
                            </FluxText>
                            <FluxText color={'muted'} size={'small'}>
                                {' complete '}
                            </FluxText>
                        </FluxFlex>
                    </>
                )}
            </FluxProgressRing>
        </>
    );
}
