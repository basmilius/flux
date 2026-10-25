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
                                        iconLeading={'scissors'}
                                        label={'Cut'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        iconLeading={'copy'}
                                        label={'Copy'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                    <FluxMenuItem
                                        iconLeading={'paste'}
                                        label={'Paste'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                </FluxMenuGroup>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuGroup>
                                    <FluxMenuFlyout icon={'plus'} label={'Insert'}>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    iconLeading={'arrow-up'}
                                                    label={'Row above'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                                <FluxMenuItem
                                                    iconLeading={'arrow-down'}
                                                    label={'Row below'}
                                                    type={'button'}
                                                    onClick={close}
                                                ></FluxMenuItem>
                                            </FluxMenuGroup>
                                            <FluxSeparator></FluxSeparator>
                                            <FluxMenuGroup>
                                                <FluxMenuFlyout
                                                    icon={'table-cells'}
                                                    label={'Cells'}
                                                >
                                                    <FluxMenu>
                                                        <FluxMenuGroup>
                                                            <FluxMenuItem
                                                                iconLeading={'arrow-right'}
                                                                label={'Shift right'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                            <FluxMenuItem
                                                                iconLeading={'arrow-down'}
                                                                label={'Shift down'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                        </FluxMenuGroup>
                                                    </FluxMenu>
                                                </FluxMenuFlyout>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                    <FluxMenuFlyout icon={'font'} label={'Format'}>
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuFlyout icon={'hashtag'} label={'Number'}>
                                                    <FluxMenu>
                                                        <FluxMenuGroup>
                                                            <FluxMenuItem
                                                                label={'Currency'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                            <FluxMenuItem
                                                                label={'Percent'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                            <FluxMenuItem
                                                                label={'Date'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                        </FluxMenuGroup>
                                                    </FluxMenu>
                                                </FluxMenuFlyout>
                                                <FluxMenuFlyout icon={'text-height'} label={'Text'}>
                                                    <FluxMenu>
                                                        <FluxMenuGroup>
                                                            <FluxMenuItem
                                                                iconLeading={'bold'}
                                                                label={'Bold'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                            <FluxMenuItem
                                                                iconLeading={'italic'}
                                                                label={'Italic'}
                                                                type={'button'}
                                                                onClick={close}
                                                            ></FluxMenuItem>
                                                        </FluxMenuGroup>
                                                        <FluxSeparator></FluxSeparator>
                                                        <FluxMenuGroup>
                                                            <FluxMenuFlyout
                                                                icon={'palette'}
                                                                label={'Color'}
                                                            >
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
                                                                            label={'Green'}
                                                                            type={'button'}
                                                                            onClick={close}
                                                                        ></FluxMenuItem>
                                                                        <FluxMenuItem
                                                                            iconLeading={'circle'}
                                                                            label={'Blue'}
                                                                            type={'button'}
                                                                            onClick={close}
                                                                        ></FluxMenuItem>
                                                                    </FluxMenuGroup>
                                                                </FluxMenu>
                                                            </FluxMenuFlyout>
                                                        </FluxMenuGroup>
                                                    </FluxMenu>
                                                </FluxMenuFlyout>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>
                                </FluxMenuGroup>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        iconLeading={'trash'}
                                        isDestructive
                                        label={'Delete row'}
                                        type={'button'}
                                        onClick={close}
                                    ></FluxMenuItem>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </>
                    )}
                >
                    <FluxPane style={{ padding: '36px', textAlign: 'center' }}>
                        {' Right-click this cell '}
                    </FluxPane>
                </FluxContextMenu>
            </div>
        </>
    );
}
