import { useState } from 'react';
import {
    FluxDataTable,
    FluxPane,
    FluxPaneHeader,
    FluxSecondaryButton,
    FluxSkeleton,
    FluxTableCell,
    FluxTableHeader,
    FluxTableRow
} from '@flux-ui/react';
export default function Example() {
    const people = [
        { id: 1, name: 'Ada Lovelace', role: 'Lead', commits: 1287 },
        { id: 2, name: 'Alan Turing', role: 'Engineer', commits: 942 },
        { id: 3, name: 'Grace Hopper', role: 'Engineer', commits: 1530 },
        { id: 4, name: 'Margaret Hamilton', role: 'Engineer', commits: 2041 }
    ];
    const [isLoading, setIsLoading] = useState(false);
    function refresh(): void {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    }
    return (
        <>
            <FluxPane>
                <FluxPaneHeader
                    title={'Members'}
                    after={
                        <>
                            <FluxSecondaryButton
                                disabled={isLoading}
                                iconLeading={'rotate'}
                                label={'Refresh'}
                                onClick={refresh}
                            ></FluxSecondaryButton>
                        </>
                    }
                ></FluxPaneHeader>
                <FluxDataTable
                    isLoading={isLoading}
                    items={people}
                    limits={[]}
                    page={1}
                    perPage={4}
                    total={people.length}
                    isHoverable
                    columns={[
                        {
                            key: 'name',
                            header: <>{'Name'}</>,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return <>{item.name}</>;
                            }
                        },
                        {
                            key: 'role',
                            header: <>{'Role'}</>,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return <>{item.role}</>;
                            }
                        },
                        {
                            key: 'commits',
                            header: <>{'Commits'}</>,
                            isShrinking: true,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return <>{item.commits}</>;
                            }
                        }
                    ]}
                    loading={
                        <>
                            {Array.from({ length: 4 }, (_, i) => i + 1).map((row) => (
                                <FluxTableRow key={row}>
                                    {Array.from({ length: 3 }, (_, i) => i + 1).map((cell) => (
                                        <FluxTableCell key={cell}>
                                            <FluxSkeleton></FluxSkeleton>
                                        </FluxTableCell>
                                    ))}
                                </FluxTableRow>
                            ))}
                        </>
                    }
                ></FluxDataTable>
            </FluxPane>
        </>
    );
}
