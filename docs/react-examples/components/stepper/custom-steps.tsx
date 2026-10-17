import { type ComponentProps, useState } from 'react';
import {
    FluxFlex,
    FluxPane,
    FluxPaneBody,
    FluxPaneFooter,
    FluxPrimaryButton,
    FluxSecondaryButton,
    FluxSpacer,
    FluxStepper,
    FluxStepperStep
} from '@flux-ui/react';
import './custom-steps-0.scss';
export default function Example() {
    const titles = ['Profile', 'Workspace', 'Done'];
    const [step, setStep] =
        useState<Exclude<ComponentProps<typeof FluxStepper>['value'], undefined>>(0);
    return (
        <>
            <div className="react-example-3ts9x705j0mob" style={{ width: '100%' }}>
                <FluxPane>
                    <FluxPaneBody>
                        <FluxStepper
                            value={step}
                            onValueChange={setStep}
                            steps={({ activate, value: modelValue, steps }) => (
                                <>
                                    <FluxFlex gap={9} style={{ width: '100%' }}>
                                        {Array.from({ length: steps }, (_, index) => index + 1).map(
                                            (index) => (
                                                <FluxSecondaryButton
                                                    key={index - 1}
                                                    label={`${index}. ${titles[index - 1]}`}
                                                    isFilled={index - 1 === modelValue}
                                                    onClick={() => {
                                                        activate(index - 1);
                                                    }}
                                                ></FluxSecondaryButton>
                                            )
                                        )}
                                    </FluxFlex>
                                </>
                            )}
                        >
                            <FluxStepperStep className={'mt'}>
                                <h2>{titles[0]}</h2>
                                <p>{'Tell us a bit about yourself.'}</p>
                            </FluxStepperStep>
                            <FluxStepperStep className={'mt'}>
                                <h2>{titles[1]}</h2>
                                <p>{'Configure the workspace settings.'}</p>
                            </FluxStepperStep>
                            <FluxStepperStep className={'mt'}>
                                <h2>{titles[2]}</h2>
                                <p>{"You're all set."}</p>
                            </FluxStepperStep>
                        </FluxStepper>
                    </FluxPaneBody>
                    <FluxPaneFooter>
                        <FluxSpacer></FluxSpacer>
                        <FluxSecondaryButton
                            disabled={step === 0}
                            label={'Back'}
                            onClick={() => {
                                setStep(step - 1);
                            }}
                        ></FluxSecondaryButton>
                        <FluxPrimaryButton
                            disabled={step === 2}
                            iconLeading={'circle-check'}
                            label={'Next'}
                            onClick={() => {
                                setStep(step + 1);
                            }}
                        ></FluxPrimaryButton>
                    </FluxPaneFooter>
                </FluxPane>
            </div>
        </>
    );
}
