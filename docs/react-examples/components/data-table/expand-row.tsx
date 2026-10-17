import { type ComponentProps, useState } from 'react';
import {
    FluxDataTable,
    FluxDescriptionItem,
    FluxDescriptionList,
    FluxPane,
    FluxTableCell,
    FluxTableHeader
} from '@flux-ui/react';
export default function Example() {
    const dataSet = [
        {
            id: 1,
            reference: '#2024-0001',
            customer: 'Acme Inc.',
            total: '€ 1,240.00',
            items: 3,
            shipping: 'Standard'
        },
        {
            id: 2,
            reference: '#2024-0002',
            customer: 'Globex',
            total: '€ 320.00',
            items: 1,
            shipping: 'Express'
        },
        {
            id: 3,
            reference: '#2024-0003',
            customer: 'Initech',
            total: '€ 78.50',
            items: 2,
            shipping: 'Standard'
        }
    ];
    const [expanded, setExpanded] = useState<
        Exclude<ComponentProps<typeof FluxDataTable>['expanded'], undefined>
    >([]);
    return (
        <>
            <FluxPane>
                <FluxDataTable
                    expanded={expanded}
                    onExpandedChange={setExpanded}
                    items={dataSet}
                    limits={[]}
                    page={1}
                    perPage={5}
                    total={dataSet.length}
                    expandTrigger="row"
                    uniqueKey={'id'}
                    isHoverable
                    columns={[
                        {
                            key: 'reference',
                            cellProps: () => ({contentDirection: 'column'}),
                            header: <>{' Order '}</>,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return (
                                    <>
                                        <strong>{item.reference}</strong>
                                        <small>{item.customer}</small>
                                    </>
                                );
                            }
                        },
                        {
                            key: 'total',
                            cellProps: () => ({isNumeric: true, noWrap: true}),
                            header: <>{' Total '}</>,
                            isShrinking: true,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return <>{item.total}</>;
                            }
                        }
                    ]}
                    expandable={({ item }) => (
                        <>
                            <FluxDescriptionList>
                                <FluxDescriptionItem label={'Customer'}>
                                    {item.customer}
                                </FluxDescriptionItem>
                                <FluxDescriptionItem label={'Items'}>
                                    {item.items}
                                </FluxDescriptionItem>
                                <FluxDescriptionItem label={'Shipping'}>
                                    {item.shipping}
                                </FluxDescriptionItem>
                            </FluxDescriptionList>
                        </>
                    )}
                ></FluxDataTable>
            </FluxPane>
        </>
    );
}
