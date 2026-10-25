import { useState } from 'react';
import {
    FluxMenu,
    FluxMenuCheckbox,
    FluxMenuFlyout,
    FluxMenuGroup,
    FluxMenuItem,
    FluxPane,
    FluxSeparator
} from '@flux-ui/react';
export default function Example() {
    const [states, setStates] = useState([
        { label: 'Draft', isEnabled: true },
        { label: 'In review', isEnabled: true },
        { label: 'Published', isEnabled: false },
        { label: 'Archived', isEnabled: false }
    ]);
    function clear(): void {
        for (const state of states) {
            state.isEnabled = false;
        }
    }
    return (
        <>
            <FluxPane style={{ width: '270px' }}>
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            iconLeading={'arrow-down-short-wide'}
                            label={'Sort'}
                        ></FluxMenuItem>
                        <FluxMenuFlyout icon={'filter'} label={'Filter'}>
                            <FluxMenu>
                                <FluxMenuGroup>
                                    {states.map((state) => (
                                        <FluxMenuCheckbox
                                            key={state.label}
                                            checked={state.isEnabled}
                                            onCheckedChange={(next) =>
                                                setStates((current) =>
                                                    current.map((item) =>
                                                        item === state
                                                            ? { ...item, isEnabled: next }
                                                            : item
                                                    )
                                                )
                                            }
                                            label={state.label}
                                        ></FluxMenuCheckbox>
                                    ))}
                                </FluxMenuGroup>
                                <FluxSeparator></FluxSeparator>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        iconLeading={'ban'}
                                        isPersistent={false}
                                        label={'Clear filters'}
                                        onClick={clear}
                                    ></FluxMenuItem>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxPane>
        </>
    );
}
