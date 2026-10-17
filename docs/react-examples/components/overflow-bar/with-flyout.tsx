import { Fragment } from 'react';
import {
    FluxFlyout,
    FluxMenu,
    FluxOverflowBar,
    FluxPane,
    FluxPaneBody,
    FluxSecondaryButton
} from '@flux-ui/react';
export default function Example() {
    const buttons = ['Export', 'Import', 'Duplicate', 'Archive', 'Delete', 'Share', 'Print'];
    return (
        <>
            <FluxPane style={{ width: 'min(100%, 480px)' }}>
                <FluxPaneBody>
                    <FluxOverflowBar
                        alignment={'end'}
                        gap={9}
                        overflow={({ items }) => (
                            <>
                                {items.length > 0 ? (
                                    <FluxFlyout
                                        opener={({ toggle }) => (
                                            <>
                                                <FluxSecondaryButton
                                                    label={`+${items.length} more`}
                                                    onClick={toggle}
                                                ></FluxSecondaryButton>
                                            </>
                                        )}
                                    >
                                        {() => (
                                            <>
                                                <FluxMenu>
                                                    {items.map((item, index) => (
                                                        <Fragment key={index}>{item}</Fragment>
                                                    ))}
                                                </FluxMenu>
                                            </>
                                        )}
                                    </FluxFlyout>
                                ) : null}
                            </>
                        )}
                    >
                        {buttons.map((label) => (
                            <FluxSecondaryButton key={label} label={label}></FluxSecondaryButton>
                        ))}
                    </FluxOverflowBar>
                </FluxPaneBody>
            </FluxPane>
        </>
    );
}
