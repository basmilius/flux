import { type ComponentProps, useState } from 'react';
import {
    FluxBadge,
    FluxBadgeStack,
    FluxDataTable,
    FluxPane,
    FluxPaneHeader,
    FluxTableCell,
    FluxTableHeader
} from '@flux-ui/react';
import { faker } from '@faker-js/faker';
export default function Example() {
    const [selected, setSelected] = useState<(string | number)[]>([]);
    const dataSet = (() => {
        faker.seed(2207);
        return Array(5)
            .fill(null)
            .map((_, index) => ({
                id: index,
                name: faker.person.fullName(),
                email: faker.internet.email(),
                isActive: faker.datatype.boolean()
            }));
    })();
    return (
        <>
            <FluxPane>
                <FluxPaneHeader
                    title={'Members'}
                    subtitle={
                        selected.length === 0
                            ? 'No rows selected'
                            : `${selected.length} row${selected.length === 1 ? '' : 's'} selected`
                    }
                ></FluxPaneHeader>
                <FluxDataTable
                    selected={selected}
                    onSelectedChange={(next) => setSelected(Array.isArray(next) ? next : [])}
                    items={dataSet}
                    limits={[]}
                    page={1}
                    perPage={5}
                    selectionMode={'multiple'}
                    total={dataSet.length}
                    uniqueKey={'id'}
                    isHoverable
                    columns={[
                        {
                            key: 'name',
                            cellProps: () => ({contentDirection: 'column'}),
                            header: <>{' Person '}</>,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const {
                                    item: { name, email }
                                } = slotProps;
                                return (
                                    <>
                                        <strong>{name}</strong>
                                        <small>{email}</small>
                                    </>
                                );
                            }
                        },
                        {
                            key: 'isActive',
                            header: <>{' Status '}</>,
                            isShrinking: true,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const {
                                    item: { isActive }
                                } = slotProps;
                                return (
                                    <>
                                        <FluxBadgeStack>
                                            {isActive ? (
                                                <FluxBadge
                                                    color={'success'}
                                                    icon={'circle-check'}
                                                    label={'Active'}
                                                ></FluxBadge>
                                            ) : (
                                                <FluxBadge
                                                    color={'danger'}
                                                    icon={'circle-xmark'}
                                                    label={'Inactive'}
                                                ></FluxBadge>
                                            )}
                                        </FluxBadgeStack>
                                    </>
                                );
                            }
                        }
                    ]}
                ></FluxDataTable>
            </FluxPane>
        </>
    );
}
