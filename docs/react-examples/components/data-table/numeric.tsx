import { useState } from 'react';
import { FluxBadge, FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/react';
export default function Example() {
    type SortDirection = 'ascending' | 'descending';
    type SortColumn = 'date' | 'amount';
    type Transaction = {
        readonly id: number;
        readonly date: string;
        readonly order: number;
        readonly description: string;
        readonly category: string;
        readonly amount: number;
    };
    const transactions: Transaction[] = [
        {
            id: 1,
            date: 'Feb 2',
            order: 20260202,
            description: 'Invoice #10241 — Lumen Co.',
            category: 'Income',
            amount: 4800
        },
        {
            id: 2,
            date: 'Feb 5',
            order: 20260205,
            description: 'Cloud hosting',
            category: 'Expense',
            amount: -320
        },
        {
            id: 3,
            date: 'Feb 11',
            order: 20260211,
            description: 'Invoice #10243 — Clayworks',
            category: 'Income',
            amount: 6120
        },
        {
            id: 4,
            date: 'Feb 14',
            order: 20260214,
            description: 'Design software licenses',
            category: 'Expense',
            amount: -540
        },
        {
            id: 5,
            date: 'Feb 22',
            order: 20260222,
            description: 'Refund — Harbor Studio',
            category: 'Refund',
            amount: -189
        }
    ];
    const [sortColumn, setSortColumn] = useState<SortColumn | null>('date');
    const [sortDirection, setSortDirection] = useState<SortDirection>('descending');
    const sortedItems = (() => {
        const column = sortColumn;
        if (!column) {
            return transactions;
        }
        const factor = sortDirection === 'ascending' ? 1 : -1;
        const key = column === 'date' ? 'order' : 'amount';
        return [...transactions].sort((a, b) => (a[key] - b[key]) * factor);
    })();
    function setSort(column: SortColumn, direction: SortDirection | null): void {
        if (direction === null) {
            setSortColumn(null);
            return;
        }
        setSortColumn(column);
        setSortDirection(direction);
    }
    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            signDisplay: 'always',
            style: 'currency'
        }).format(value);
    }
    return (
        <>
            <FluxPane>
                <FluxDataTable
                    sort={sortColumn ? { key: sortColumn, direction: sortDirection } : null}
                    onSortChange={(next) => {
                        if (!next) setSortColumn(null);
                        else if (next.key === 'date' || next.key === 'amount')
                            setSort(next.key, next.direction);
                    }}
                    items={sortedItems}
                    limits={[]}
                    page={1}
                    perPage={transactions.length}
                    total={transactions.length}
                    isHoverable
                    columns={[
                        {
                            key: 'date',
                            dataType: 'date',
                            sortable: true,
                            header: <>{' Date '}</>,
                            isNumeric: true,
                            isShrinking: true,
                            noWrap: true,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return <>{item.date}</>;
                            }
                        },
                        {
                            key: 'description',
                            header: <>{'Description'}</>,
                            minWidth: 200,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return <>{item.description}</>;
                            }
                        },
                        {
                            key: 'category',
                            header: <>{'Category'}</>,
                            isShrinking: true,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return (
                                    <>
                                        <FluxBadge color={'gray'} label={item.category}></FluxBadge>
                                    </>
                                );
                            }
                        },
                        {
                            key: 'amount',
                            dataType: 'numeric',
                            sortable: true,
                            header: <>{' Amount '}</>,
                            align: 'end',
                            isNumeric: true,
                            noWrap: true,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return <>{formatCurrency(item.amount)}</>;
                            }
                        }
                    ]}
                ></FluxDataTable>
            </FluxPane>
        </>
    );
}
