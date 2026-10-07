import { createElement, type ComponentProps, useState } from 'react';
import {
    FluxDynamicView,
    FluxFlex,
    FluxFormField,
    FluxPrimaryButton,
    FluxSecondaryButton,
    FluxToggle
} from '@flux-ui/react';
export default function Example() {
    const [showPrimary, setShowPrimary] =
        useState<Exclude<ComponentProps<typeof FluxToggle>['checked'], undefined>>(true);
    const action = (() =>
        showPrimary
            ? createElement(FluxPrimaryButton, { label: 'Save changes' })
            : createElement(FluxSecondaryButton, { label: 'Save changes' }))();
    return (
        <>
            <FluxFlex direction={'vertical'} gap={9}>
                <FluxFormField label={'Emphasise the action'}>
                    <FluxToggle checked={showPrimary} onCheckedChange={setShowPrimary}></FluxToggle>
                </FluxFormField>
                <FluxDynamicView vnode={action}></FluxDynamicView>
            </FluxFlex>
        </>
    );
}
