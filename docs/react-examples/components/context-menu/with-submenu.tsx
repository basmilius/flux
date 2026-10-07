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
                                        iconLeading={'pen'}
                                        label={'Rename'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                    <FluxMenuFlyout icon={'arrow-up-from-square'} label={'Share'}>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    iconLeading={'paper-plane'}
                                                    label={'Email'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                                <FluxMenuItem
                                                    iconLeading={'copy'}
                                                    label={'Copy link'}
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
                        {' Right-click here '}
                    </FluxPane>
                </FluxContextMenu>
            </div>
        </>
    );
}
