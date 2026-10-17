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
                                    <FluxMenuFlyout icon={'image'} label={'Open With'}>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    iconLeading={'eye'}
                                                    label={'Preview'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                                <FluxMenuItem
                                                    iconLeading={'image'}
                                                    label={'Photos'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                            </FluxMenuGroup>
                                            <FluxSeparator></FluxSeparator>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    label={'App Store…'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                    <FluxMenuItem
                                        iconLeading={'trash'}
                                        isDestructive
                                        label={'Move to Trash'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                </FluxMenuGroup>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        iconLeading={'circle-info'}
                                        label={'Get Info'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        iconLeading={'pen'}
                                        label={'Rename'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        iconLeading={'clone'}
                                        label={'Duplicate'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        iconLeading={'eye'}
                                        label={'Quick Look'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                </FluxMenuGroup>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        iconLeading={'copy'}
                                        label={'Copy'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                    <FluxMenuFlyout icon={'arrow-up-from-square'} label={'Share'}>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    iconLeading={'paper-plane'}
                                                    label={'Mail'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                                <FluxMenuItem
                                                    iconLeading={'copy'}
                                                    label={'Copy Link'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                    <FluxMenuFlyout icon={'bolt'} label={'Quick Actions'}>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    iconLeading={'rotate-left'}
                                                    label={'Rotate Left'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                                <FluxMenuItem
                                                    iconLeading={'pen'}
                                                    label={'Markup'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                                <FluxMenuItem
                                                    iconLeading={'image'}
                                                    label={'Convert Image'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                </FluxMenuGroup>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuGroup>
                                    <FluxMenuFlyout icon={'palette'} label={'Tags'}>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    iconLeading={'circle'}
                                                    label={'Red'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                                <FluxMenuItem
                                                    iconLeading={'circle'}
                                                    label={'Orange'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                                <FluxMenuItem
                                                    iconLeading={'circle'}
                                                    label={'Green'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                    <FluxMenuFlyout icon={'gear'} label={'Services'}>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    label={'Show in Enclosing Folder'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                                <FluxMenuItem
                                                    label={'New Terminal at Folder'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </>
                    )}
                >
                    <FluxPane style={{ padding: '36px', textAlign: 'center' }}>
                        {' Right-click this item '}
                    </FluxPane>
                </FluxContextMenu>
            </div>
        </>
    );
}
