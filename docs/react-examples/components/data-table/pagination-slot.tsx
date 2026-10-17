import { useState } from 'react';
import {
    FluxDataTable,
    FluxPagination,
    FluxPane,
    FluxTableCell,
    FluxTableHeader
} from '@flux-ui/react';
export default function Example() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const dataSet = (() =>
        Array(500)
            .fill(null)
            .map((_, index) => ({
                id: index,
                name: `Item ${index + 1}`
            })))();
    const visibleItems = (() => dataSet.slice((page - 1) * perPage, page * perPage) ?? [])();
    return (
        <>
            <FluxPane>
                <FluxDataTable
                    items={visibleItems}
                    isHoverable
                    limits={[10]}
                    page={page}
                    perPage={perPage}
                    total={dataSet.length}
                    onNavigate={(p) => setPage(p)}
                    columns={[
                        {
                            key: 'name',
                            header: <>{'Name'}</>,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const {
                                    item: { name }
                                } = slotProps;
                                return <>{name}</>;
                            }
                        }
                    ]}
                    pagination={
                        <>
                            <FluxPagination
                                arrows
                                isCompact
                                page={page}
                                perPage={perPage}
                                total={dataSet.length}
                                onNavigate={(p) => setPage(p)}
                            ></FluxPagination>
                        </>
                    }
                ></FluxDataTable>
            </FluxPane>
        </>
    );
}
