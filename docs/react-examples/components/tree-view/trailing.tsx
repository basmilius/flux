import {
    FluxBadge,
    FluxMenu,
    FluxPane,
    FluxTreeView,
    type FluxTreeViewOption
} from '@flux-ui/react';
export default function Example() {
    const counts: Record<string | number, number> = {
        3: 12,
        4: 8,
        5: 4,
        7: 21,
        8: 3
    };
    const options: FluxTreeViewOption[] = [
        {
            id: 1,
            label: 'Electronics',
            children: [
                {
                    id: 2,
                    label: 'Computers',
                    children: [
                        { id: 3, label: 'Laptops' },
                        { id: 4, label: 'Desktops' },
                        { id: 5, label: 'Tablets' }
                    ]
                },
                {
                    id: 6,
                    label: 'Phones',
                    children: [
                        { id: 7, label: 'Smartphones' },
                        { id: 8, label: 'Feature phones' }
                    ]
                }
            ]
        }
    ];
    return (
        <>
            <FluxPane style={{ maxWidth: '390px' }}>
                <FluxMenu>
                    <FluxTreeView
                        aria-label={'Product categories'}
                        levelColors={['primary', 'info', 'success']}
                        options={options}
                        trailing={(node) => (
                            <>
                                {counts[node.id] ? (
                                    <FluxBadge label={`${counts[node.id]}`}></FluxBadge>
                                ) : null}
                            </>
                        )}
                    ></FluxTreeView>
                </FluxMenu>
            </FluxPane>
        </>
    );
}
