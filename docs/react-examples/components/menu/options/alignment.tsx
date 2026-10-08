import { type ComponentProps, useState } from 'react';
import { FluxFlex, FluxMenu, FluxMenuItem, FluxMenuOptions, FluxPane } from '@flux-ui/react';
export default function Example() {
    const ALIGNMENTS = {
        0: 'left',
        1: 'center',
        2: 'right',
        3: 'justify'
    } as const;
    const [alignment, setAlignment] = useState<0 | 1 | 2 | 3>(0);
    return (
        <>
            <FluxFlex direction={'vertical'} gap={12}>
                <FluxPane style={{ width: '270px' }}>
                    <FluxMenu>
                        <FluxMenuOptions
                            value={alignment}
                            onValueChange={(value) => setAlignment(Number(value) as 0 | 1 | 2 | 3)}
                            isHorizontal
                        >
                            <FluxMenuItem iconLeading={'align-left'}></FluxMenuItem>
                            <FluxMenuItem iconLeading={'align-center'}></FluxMenuItem>
                            <FluxMenuItem iconLeading={'align-right'}></FluxMenuItem>
                            <FluxMenuItem iconLeading={'align-justify'}></FluxMenuItem>
                        </FluxMenuOptions>
                    </FluxMenu>
                </FluxPane>
                <small>
                    <kbd>
                        {'Result = '}
                        {ALIGNMENTS[alignment]}
                    </kbd>
                </small>
            </FluxFlex>
        </>
    );
}
