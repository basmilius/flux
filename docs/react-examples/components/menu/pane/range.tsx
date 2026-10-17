import { type ComponentProps, useState } from 'react';
import {
    FluxFormRangeSlider,
    FluxMenu,
    FluxMenuFlyout,
    FluxMenuGroup,
    FluxMenuItem,
    FluxMenuPane,
    FluxPane
} from '@flux-ui/react';
export default function Example() {
    const [price, setPrice] = useState<
        Exclude<ComponentProps<typeof FluxFormRangeSlider>['value'], undefined>
    >([200, 800]);
    return (
        <>
            <FluxPane style={{ width: '240px' }}>
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem iconLeading={'arrow-down-a-z'} label={'Sort'}></FluxMenuItem>
                        <FluxMenuFlyout icon={'money-bill'} label={'Price range'}>
                            <FluxMenu>
                                <FluxMenuPane>
                                    <FluxFormRangeSlider
                                        value={price}
                                        onValueChange={setPrice}
                                        max={1000}
                                        min={0}
                                        step={50}
                                    ></FluxFormRangeSlider>
                                </FluxMenuPane>
                            </FluxMenu>
                        </FluxMenuFlyout>
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxPane>
        </>
    );
}
