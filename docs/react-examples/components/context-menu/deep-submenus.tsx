import { useState } from 'react';
import {
    FluxContextMenu,
    FluxMenu,
    FluxMenuFlyout,
    FluxMenuGroup,
    FluxMenuItem,
    FluxPane,
    FluxSeparator,
    FluxToggle
} from '@flux-ui/react';
export default function Example() {
    const [showCone, setShowCone] = useState(false);
    return (
        <>
            <div style={{ display: 'flex', flexFlow: 'column', gap: '15px' }}>
                <div style={{display: 'flex', alignItems: 'center', gap: 9}}>
                    <FluxToggle checked={showCone} onCheckedChange={setShowCone} />
                    Prediction cone
                </div>
                <FluxContextMenu
                    debugCone={showCone}
                    menu={({ close }) => (
                        <>
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        iconLeading={'arrow-up-right-from-square'}
                                        label={'Open'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                    <FluxMenuFlyout icon={'folder-tree'} label={'Move to'}>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuFlyout icon={'folder'} label={'Documents'}>
                                                    <FluxMenu>
                                                        <FluxMenuGroup>
                                                            <FluxMenuFlyout
                                                                icon={'folder'}
                                                                label={'Work'}
                                                            >
                                                                <FluxMenu>
                                                                    <FluxMenuGroup>
                                                                        <FluxMenuItem
                                                                            iconLeading={'folder'}
                                                                            label={'2025'}
                                                                            type={'button'}
                                                                            onClick={close}
                                                                        ></FluxMenuItem>
                                                                        <FluxMenuItem
                                                                            iconLeading={'folder'}
                                                                            label={'2026'}
                                                                            type={'button'}
                                                                            onClick={close}
                                                                        ></FluxMenuItem>
                                                                    </FluxMenuGroup>
                                                                </FluxMenu>
                                                            </FluxMenuFlyout>
                                                            <FluxMenuItem
                                                                iconLeading={'folder'}
                                                                label={'Personal'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                            <FluxMenuItem
                                                                iconLeading={'folder'}
                                                                label={'Invoices'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                        </FluxMenuGroup>
                                                    </FluxMenu>
                                                </FluxMenuFlyout>
                                                <FluxMenuFlyout icon={'folder'} label={'Pictures'}>
                                                    <FluxMenu>
                                                        <FluxMenuGroup>
                                                            <FluxMenuItem
                                                                iconLeading={'folder'}
                                                                label={'Camera Roll'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                            <FluxMenuItem
                                                                iconLeading={'folder'}
                                                                label={'Screenshots'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                        </FluxMenuGroup>
                                                    </FluxMenu>
                                                </FluxMenuFlyout>
                                                <FluxMenuItem
                                                    iconLeading={'folder'}
                                                    label={'Desktop'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                </FluxMenuGroup>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        iconLeading={'trash'}
                                        isDestructive
                                        label={'Delete'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </>
                    )}
                >
                    <FluxPane style={{ padding: '36px', textAlign: 'center' }}>
                        {' Right-click this file '}
                    </FluxPane>
                </FluxContextMenu>
            </div>
        </>
    );
}
