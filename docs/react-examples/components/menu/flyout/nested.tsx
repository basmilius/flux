import { useState } from 'react';
import {
    FluxMenu,
    FluxMenuFlyout,
    FluxMenuGroup,
    FluxMenuItem,
    FluxPane,
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
                <FluxPane style={{ width: '300px' }}>
                    <FluxMenu debugCone={showCone}>
                        <FluxMenuGroup>
                            <FluxMenuItem iconLeading={'pen'} label={'Edit'}></FluxMenuItem>
                            <FluxMenuFlyout icon={'arrow-up-from-square'} label={'Share'}>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            iconLeading={'paper-plane'}
                                            label={'Email'}
                                        ></FluxMenuItem>
                                        <FluxMenuFlyout icon={'users'} label={'Social'}>
                                            <FluxMenu>
                                                <FluxMenuGroup>
                                                    <FluxMenuItem label={'Mastodon'}></FluxMenuItem>
                                                    <FluxMenuItem label={'Bluesky'}></FluxMenuItem>
                                                    <FluxMenuItem label={'LinkedIn'}></FluxMenuItem>
                                                </FluxMenuGroup>
                                            </FluxMenu>
                                        </FluxMenuFlyout>
                                        <FluxMenuItem
                                            iconLeading={'copy'}
                                            label={'Copy link'}
                                        ></FluxMenuItem>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxMenuFlyout>
                        </FluxMenuGroup>
                    </FluxMenu>
                </FluxPane>
            </div>
        </>
    );
}
