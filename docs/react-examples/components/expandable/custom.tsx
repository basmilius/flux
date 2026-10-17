import { FluxButtonStack, FluxExpandable, FluxSecondaryButton } from '@flux-ui/react';
export default function Example() {
    return (
        <>
            <FluxExpandable
                header={({ isOpen, toggle }) => (
                    <>
                        <FluxButtonStack>
                            <FluxSecondaryButton
                                label={'Open'}
                                onClick={() => {
                                    !isOpen && toggle();
                                }}
                            ></FluxSecondaryButton>
                            <FluxSecondaryButton
                                label={'Close'}
                                onClick={() => {
                                    isOpen && toggle();
                                }}
                            ></FluxSecondaryButton>
                            <FluxSecondaryButton
                                label={'Toggle'}
                                onClick={() => {
                                    toggle();
                                }}
                            ></FluxSecondaryButton>
                        </FluxButtonStack>
                    </>
                )}
            >
                <p>
                    {
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid asperiores, autem dignissimos dolores eligendi error, eum maxime necessitatibus pariatur quas qui quo quod ratione temporibus ullam ut, veritatis voluptate?'
                    }
                </p>
            </FluxExpandable>
        </>
    );
}
