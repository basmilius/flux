import { type ComponentProps, useState } from 'react';
import {
    FluxBadge,
    FluxBadgeStack,
    FluxDataTable,
    FluxFilterBar,
    FluxFilterOption,
    FluxPane,
    FluxTableBar,
    FluxTableCell,
    FluxTableHeader,
    type FluxFilterOptionItem,
    type FluxFilterState
} from '@flux-ui/react';
import { useEffect } from 'react';
export default function Example() {
    type Category = 'lighting' | 'furniture' | 'kitchen';
    type Product = {
        readonly id: number;
        readonly name: string;
        readonly category: Category;
        readonly status: 'active' | 'archived';
        readonly price: number;
    };
    const categoryLabels: Record<Category, string> = {
        lighting: 'Lighting',
        furniture: 'Furniture',
        kitchen: 'Kitchen'
    };
    const statusOptions: FluxFilterOptionItem[] = [
        { icon: 'circle-check', label: 'Active', value: 'active' },
        { icon: 'circle-xmark', label: 'Archived', value: 'archived' }
    ];
    const categoryOptions: FluxFilterOptionItem[] = [
        { label: 'Lighting', value: 'lighting' },
        { label: 'Furniture', value: 'furniture' },
        { label: 'Kitchen', value: 'kitchen' }
    ];
    const products: Product[] = [
        { id: 1, name: 'Aurora Lamp', category: 'lighting', status: 'active', price: 4900 },
        { id: 2, name: 'Borealis Desk', category: 'furniture', status: 'active', price: 32900 },
        { id: 3, name: 'Cinder Mug', category: 'kitchen', status: 'archived', price: 1450 },
        { id: 4, name: 'Delta Chair', category: 'furniture', status: 'active', price: 18900 },
        { id: 5, name: 'Ember Kettle', category: 'kitchen', status: 'active', price: 7900 },
        { id: 6, name: 'Flare Sconce', category: 'lighting', status: 'archived', price: 6900 },
        { id: 7, name: 'Glow Pendant', category: 'lighting', status: 'active', price: 12900 },
        { id: 8, name: 'Harbor Stool', category: 'furniture', status: 'active', price: 9900 },
        { id: 9, name: 'Iris Teapot', category: 'kitchen', status: 'active', price: 5400 },
        { id: 10, name: 'Juno Floor Lamp', category: 'lighting', status: 'active', price: 21900 },
        { id: 11, name: 'Koto Bench', category: 'furniture', status: 'archived', price: 27900 },
        { id: 12, name: 'Lumen Toaster', category: 'kitchen', status: 'active', price: 8400 }
    ];
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [search, setSearch] =
        useState<Exclude<ComponentProps<typeof FluxFilterBar>['search'], undefined>>('');
    const [selected, setSelected] = useState<(string | number)[]>([]);
    const [filterState, setFilterState] = useState<
        Exclude<ComponentProps<typeof FluxFilterBar>['value'], undefined>
    >({
        status: null,
        category: null
    });
    const filteredItems = (() =>
        products.filter((product) => {
            if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
                return false;
            }
            if (filterState.status && product.status !== filterState.status) {
                return false;
            }
            if (filterState.category && product.category !== filterState.category) {
                return false;
            }
            return true;
        }))();
    const paginatedItems = (() => {
        const start = (page - 1) * perPage;
        return filteredItems.slice(start, start + perPage);
    })();
    useEffect(() => {
        setPage(1);
    }, [search, filterState]);
    function onLimit(limit: number): void {
        setPerPage(limit);
        setPage(1);
    }
    function priceLabel(price: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            style: 'currency'
        }).format(price / 100);
    }
    return (
        <>
            <FluxPane>
                <FluxDataTable
                    selected={selected}
                    onSelectedChange={(next) => setSelected(Array.isArray(next) ? next : [])}
                    items={paginatedItems}
                    limits={[5, 10, 25]}
                    page={page}
                    perPage={perPage}
                    total={filteredItems.length}
                    selectionMode={'multiple'}
                    uniqueKey={'id'}
                    isHoverable
                    onLimit={onLimit}
                    onNavigate={($event) => {
                        setPage($event);
                    }}
                    columns={[
                        {
                            key: 'name',
                            cellProps: () => ({contentDirection: 'column'}),
                            header: <>{'Product'}</>,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return (
                                    <>
                                        <strong>{item.name}</strong>
                                        <small>{categoryLabels[item.category]}</small>
                                    </>
                                );
                            }
                        },
                        {
                            key: 'status',
                            header: <>{'Status'}</>,
                            isShrinking: true,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return (
                                    <>
                                        <FluxBadgeStack>
                                            <FluxBadge
                                                color={
                                                    item.status === 'active' ? 'success' : 'gray'
                                                }
                                                label={
                                                    item.status === 'active' ? 'Active' : 'Archived'
                                                }
                                            ></FluxBadge>
                                        </FluxBadgeStack>
                                    </>
                                );
                            }
                        },
                        {
                            key: 'price',
                            cellProps: () => ({align: 'end', isNumeric: true, noWrap: true}),
                            header: <>{' Price '}</>,
                            align: 'end',
                            isShrinking: true,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return <>{priceLabel(item.price)}</>;
                            }
                        }
                    ]}
                    filter={
                        <>
                            <FluxTableBar>
                                <FluxFilterBar
                                    value={filterState}
                                    onValueChange={setFilterState}
                                    search={search}
                                    onSearchChange={setSearch}
                                    isSearchable
                                    searchPlaceholder={'Search products...'}
                                >
                                    <FluxFilterOption
                                        icon={'circle-check'}
                                        label={'Status'}
                                        name={'status'}
                                        options={statusOptions}
                                    ></FluxFilterOption>
                                    <FluxFilterOption
                                        icon={'clone'}
                                        label={'Category'}
                                        name={'category'}
                                        options={categoryOptions}
                                    ></FluxFilterOption>
                                </FluxFilterBar>
                            </FluxTableBar>
                        </>
                    }
                ></FluxDataTable>
            </FluxPane>
        </>
    );
}
