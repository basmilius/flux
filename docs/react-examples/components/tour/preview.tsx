import { type ComponentProps, useState } from 'react';
import { FluxPrimaryButton, FluxSecondaryButton, FluxTour, FluxTourItem } from '@flux-ui/react';
export default function Example() {
    const [root, setRoot] = useState<HTMLElementTagNameMap['div'] | null>(null);
    const [active, setActive] =
        useState<Exclude<ComponentProps<typeof FluxTour>['active'], undefined>>(false);
    const [step, setStep] =
        useState<Exclude<ComponentProps<typeof FluxTour>['step'], undefined>>(0);
    function start(): void {
        setStep(0);
        setActive(true);
    }
    return (
        <>
            <div
                ref={setRoot}
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                    gap: '18px',
                    alignItems: 'flex-start'
                }}
            >
                <div style={{ display: 'flex', gap: '9px' }}>
                    <span id={'tour-create'}>
                        <FluxPrimaryButton label={'Create'}></FluxPrimaryButton>
                    </span>
                    <span id={'tour-search'}>
                        <FluxSecondaryButton label={'Search'}></FluxSecondaryButton>
                    </span>
                    <span id={'tour-settings'}>
                        <FluxSecondaryButton label={'Settings'}></FluxSecondaryButton>
                    </span>
                </div>
                <FluxSecondaryButton label={'Start tour'} onClick={start}></FluxSecondaryButton>
                <FluxTour
                    active={active}
                    onActiveChange={setActive}
                    step={step}
                    onStepChange={setStep}
                    root={root ?? undefined}
                >
                    <FluxTourItem target={'#tour-create'} title={'Create'}>
                        {' Start by creating a new item here. '}
                    </FluxTourItem>
                    <FluxTourItem target={'#tour-search'} title={'Search'}>
                        {' Quickly find anything in your workspace. '}
                    </FluxTourItem>
                    <FluxTourItem target={'#tour-settings'} title={'Settings'}>
                        {' Tweak your preferences anytime. '}
                    </FluxTourItem>
                </FluxTour>
            </div>
        </>
    );
}
