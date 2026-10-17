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
                            <FluxMenuItem iconLeading={'plus'} label={'New file'}></FluxMenuItem>
                            <FluxMenuFlyout icon={'arrow-up-from-square'} label={'Export as'}>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem label={'PDF'}></FluxMenuItem>
                                        <FluxMenuItem label={'PNG'}></FluxMenuItem>
                                        <FluxMenuItem label={'SVG'}></FluxMenuItem>
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
