import { type ComponentProps, useState } from 'react';
import {
    FluxFlex,
    FluxFlyout,
    FluxMenu,
    FluxMenuItem,
    FluxMenuOptions,
    FluxSecondaryButton
} from '@flux-ui/react';
export default function Example() {
    const VIEWS = ['List', 'Grid', 'Gallery'];
    const [view, setView] = useState<number>(0);
    return (
        <>
            <FluxFlex direction={'vertical'} gap={12}>
                <FluxFlyout
                    opener={({ open }) => (
                        <>
                            <FluxSecondaryButton
                                iconTrailing={'angle-down'}
                                label={`View: ${VIEWS[view]}`}
                                onClick={() => {
                                    open();
                                }}
                            ></FluxSecondaryButton>
                        </>
                    )}
                >
                    {() => (
                        <>
                            <FluxMenu style={{ width: '200px' }}>
                                <FluxMenuOptions
                                    value={view}
                                    onValueChange={(value) => setView(Number(value))}
                                    mode={'select'}
                                >
                                    <FluxMenuItem
                                        iconLeading={'list'}
                                        label={'List'}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        iconLeading={'grid-2'}
                                        label={'Grid'}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        iconLeading={'image'}
                                        label={'Gallery'}
                                    ></FluxMenuItem>
                                </FluxMenuOptions>
                            </FluxMenu>
                        </>
                    )}
                </FluxFlyout>
                <small>
                    <kbd>{'Selecting an option keeps the menu open'}</kbd>
                </small>
            </FluxFlex>
        </>
    );
}
