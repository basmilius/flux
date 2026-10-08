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
                <FluxPane style={{ width: '320px' }}>
                    <FluxMenu debugCone={showCone}>
                        <FluxMenuGroup>
                            <FluxMenuFlyout icon={'align-left'} label={'Align'}>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            iconLeading={'align-left'}
                                            label={'Left'}
                                        ></FluxMenuItem>
                                        <FluxMenuItem
                                            iconLeading={'align-center'}
                                            label={'Center'}
                                        ></FluxMenuItem>
                                        <FluxMenuItem
                                            iconLeading={'align-right'}
                                            label={'Right'}
                                        ></FluxMenuItem>
                                        <FluxMenuItem
                                            iconLeading={'align-justify'}
                                            label={'Justify'}
                                        ></FluxMenuItem>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxMenuFlyout>
                            <FluxMenuFlyout icon={'list-ul'} label={'List'}>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            iconLeading={'list-ul'}
                                            label={'Bulleted'}
                                        ></FluxMenuItem>
                                        <FluxMenuItem
                                            iconLeading={'list-ol'}
                                            label={'Numbered'}
                                        ></FluxMenuItem>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxMenuFlyout>
                            <FluxMenuFlyout icon={'indent'} label={'Indentation'}>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            iconLeading={'indent'}
                                            label={'Increase'}
                                        ></FluxMenuItem>
                                        <FluxMenuItem
                                            iconLeading={'outdent'}
                                            label={'Decrease'}
                                        ></FluxMenuItem>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxMenuFlyout>
                            <FluxMenuFlyout icon={'image'} label={'Insert'}>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            iconLeading={'image'}
                                            label={'Image'}
                                        ></FluxMenuItem>
                                        <FluxMenuItem
                                            iconLeading={'play'}
                                            label={'Video'}
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
