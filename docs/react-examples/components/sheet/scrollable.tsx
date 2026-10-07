import { useState } from 'react';
import {
    FluxItem,
    FluxItemActions,
    FluxItemContent,
    FluxItemStack,
    FluxPane,
    FluxPaneFooter,
    FluxPaneHeader,
    FluxSecondaryButton,
    FluxSheet,
    FluxSpacer
} from '@flux-ui/react';
export default function Example() {
    const orders = Array.from({ length: 24 }, (_, index) => ({
        id: `#${4820 - index}`,
        date: `March ${((index * 3) % 28) + 1}, 2025`,
        total: `€ ${(19 + index * 7).toFixed(2)}`
    }));
    const [isSheetOpened, setIsSheetOpened] = useState(false);
    return (
        <>
            <FluxSecondaryButton
                iconLeading={'list-ul'}
                label={'Order history'}
                onClick={() => {
                    setIsSheetOpened(true);
                }}
            ></FluxSecondaryButton>
            <FluxSheet
                snapPoints={[.5, .95]}
                isCloseable
                onClose={() => {
                    setIsSheetOpened(false);
                }}
                open={isSheetOpened}
            >
                {isSheetOpened ? (
                    <FluxPane>
                        <FluxPaneHeader title={'Order history'}></FluxPaneHeader>
                        <FluxItemStack>
                            {orders.map((order) => (
                                <FluxItem key={order.id}>
                                    <FluxItemContent>
                                        <strong>{order.id}</strong>
                                        <span style={{ fontSize: '.875rem', opacity: '.6' }}>
                                            {order.date}
                                        </span>
                                    </FluxItemContent>
                                    <FluxItemActions isCenter>
                                        <span>{order.total}</span>
                                    </FluxItemActions>
                                </FluxItem>
                            ))}
                        </FluxItemStack>
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
