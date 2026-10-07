import { useState } from 'react';
import {
    FluxPane,
    FluxPaneBody,
    FluxPaneFooter,
    FluxPaneHeader,
    FluxPrimaryButton,
    FluxSecondaryButton,
    FluxSlideOver,
    FluxSpacer,
    FluxTab,
    FluxTabBar,
    FluxTabBarItem,
    FluxTabs
} from '@flux-ui/react';
export default function Example() {
    const [isSlideOverOpened, setIsSlideOverOpened] = useState(false);
    const [exampleValue0, setExampleValue0] = useState(0);
    return (
        <>
            <FluxSecondaryButton
                iconLeading={'arrow-left-to-line'}
                label={'Open'}
                onClick={() => {
                    setIsSlideOverOpened(true);
                }}
            ></FluxSecondaryButton>
            <FluxSlideOver open={isSlideOverOpened}>
                {isSlideOverOpened ? (
                    <FluxPane>
                        <FluxPaneHeader title={'Slide over'}>
                            <FluxSecondaryButton
                                iconLeading={'xmark'}
                                onClick={() => {
                                    setIsSlideOverOpened(false);
                                }}
                            ></FluxSecondaryButton>
                        </FluxPaneHeader>
                        <FluxTabs value={exampleValue0} onValueChange={setExampleValue0}>
                            <FluxTab label={'Common'}>
                                <FluxPaneBody>
                                    {
                                        ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde. '
                                    }
                                </FluxPaneBody>
                            </FluxTab>
                            <FluxTab label={'Advanced'}>
                                <FluxPaneBody>
                                    {
                                        ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur dolorem dolorum ducimus enim, fuga, hic illo labore libero, magnam minima odio pariatur porro quasi quidem quis repellat reprehenderit vero? '
                                    }
                                </FluxPaneBody>
                            </FluxTab>
                        </FluxTabs>
                        <FluxPaneFooter>
                            <FluxSecondaryButton
                                label={'Close'}
                                onClick={() => {
                                    setIsSlideOverOpened(false);
                                }}
                            ></FluxSecondaryButton>
                            <FluxSpacer></FluxSpacer>
                            <FluxPrimaryButton
                                iconLeading={'circle-check'}
                                label={'Save'}
                                onClick={() => {
                                    setIsSlideOverOpened(false);
                                }}
                            ></FluxPrimaryButton>
                        </FluxPaneFooter>
                    </FluxPane>
                ) : null}
            </FluxSlideOver>
        </>
    );
}
