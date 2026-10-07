import { useState } from 'react';
import {
    FluxButtonGroup,
    FluxPane,
    FluxPaneBody,
    FluxPaneFooter,
    FluxPaneHeader,
    FluxSecondaryButton,
    FluxSheet,
    FluxSpacer
} from '@flux-ui/react';
export default function Example() {
    type Position = 'bottom' | 'left' | 'right' | 'top';
    const positions: Position[] = ['bottom', 'left', 'right', 'top'];
    const [isSheetOpened, setIsSheetOpened] = useState(false);
    const [position, setPosition] = useState<Position>('bottom');
    function open(next: Position): void {
        setPosition(next);
        setIsSheetOpened(true);
    }
    return (
        <>
            <FluxButtonGroup>
                {positions.map((option) => (
                    <FluxSecondaryButton
                        key={option}
                        label={option}
                        onClick={() => {
                            open(option);
                        }}
                    ></FluxSecondaryButton>
                ))}
            </FluxButtonGroup>
            <FluxSheet
                snapPoints={[.4, .8]}
                isCloseable
                position={position}
                onClose={() => {
                    setIsSheetOpened(false);
                }}
                open={isSheetOpened}
            >
                {isSheetOpened ? (
                    <FluxPane>
                        <FluxPaneHeader title={`Sheet from the ${position}`}></FluxPaneHeader>
                        <FluxPaneBody>
                            <p>
                                {
                                    'Drag the grabber along its axis, flick it away to dismiss it, or use the arrow keys once it has focus.'
                                }
                            </p>
                        </FluxPaneBody>
                        <FluxPaneFooter>
                            <FluxSpacer></FluxSpacer>
                            <FluxSecondaryButton
                                label={'Close'}
                                onClick={() => {
                                    setIsSheetOpened(false);
                                }}
                            ></FluxSecondaryButton>
                        </FluxPaneFooter>
                    </FluxPane>
                ) : null}
            </FluxSheet>
        </>
    );
}
