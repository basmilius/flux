import {
    FluxBadge,
    FluxDescriptionItem,
    FluxDescriptionList,
    FluxFlowActionCard,
    FluxSecondaryButton
} from '@flux-ui/react';
import { useState, useEffect } from 'react';
export default function Example() {
    const [isFinished, setFinished] = useState(false);
    const [isRunning, setRunning] = useState(false);
    useEffect(() => {
        if (!isRunning) return;
        const timeout = setTimeout(() => {
            setFinished(true);
            setRunning(false);
        }, 2400);
        return () => clearTimeout(timeout);
    }, [isRunning]);
    function run() {
        setFinished(false);
        setRunning(true);
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
                <FluxFlowActionCard
                    title={'Sync inventory'}
                    subtitle={'Warehouse API'}
                    active={isRunning}
                    isLoading={isRunning}
                    footer={
                        <>
                            <FluxSecondaryButton
                                iconLeading={'rotate'}
                                label={'Run step'}
                                disabled={isRunning}
                                onClick={run}
                            ></FluxSecondaryButton>
                            {isFinished ? (
                                <FluxBadge
                                    color={'success'}
                                    icon={'circle-check'}
                                    label={'Synced'}
                                ></FluxBadge>
                            ) : null}
                        </>
                    }
                >
                    <FluxDescriptionList>
                        <FluxDescriptionItem label={'Products'}>{'1.284'}</FluxDescriptionItem>
                        <FluxDescriptionItem label={'Batch size'}>{'250'}</FluxDescriptionItem>
                    </FluxDescriptionList>
                </FluxFlowActionCard>
            </div>
        </>
    );
}
