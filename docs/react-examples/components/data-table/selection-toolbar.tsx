import { type ComponentProps, useState } from 'react';
import {
    FluxDataTable,
    FluxFilterBar,
    FluxFilterOption,
    FluxFlex,
    FluxFlexItem,
    FluxPane,
    FluxSecondaryButton,
    FluxSpacer,
    FluxTableBar,
    FluxTableCell,
    FluxTableHeader,
    type FluxFilterOptionItem,
    type FluxFilterState
} from '@flux-ui/react';
export default function Example() {
    const roleOptions: FluxFilterOptionItem[] = [
        { label: 'Lead', value: 'Lead' },
        { label: 'Engineer', value: 'Engineer' },
        { label: 'Manager', value: 'Manager' }
    ];
    const [search, setSearch] =
        useState<Exclude<ComponentProps<typeof FluxFilterBar>['search'], undefined>>('');
    const [selected, setSelected] = useState<(string | number)[]>([2, 4]);
    const [filterState, setFilterState] = useState<
        Exclude<ComponentProps<typeof FluxFilterBar>['value'], undefined>
    >({
        role: null
    });
    const [people, setPeople] = useState([
        { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Lead' },
        { id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Engineer' },
        { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Engineer' },
        { id: 4, name: 'Katherine Johnson', email: 'katherine@example.com', role: 'Manager' },
        { id: 5, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Engineer' },
        { id: 6, name: 'Radia Perlman', email: 'radia@example.com', role: 'Engineer' }
    ]);
    const filteredPeople = (() =>
        people.filter((person) => {
            if (search && !person.name.toLowerCase().includes(search.toLowerCase())) {
                return false;
            }
            if (filterState.role && person.role !== filterState.role) {
                return false;
            }
            return true;
        }))();
    function deleteSelected(): void {
        setPeople(people.filter((person) => !selected.includes(person.id)));
        setSelected([]);
    }
    return (
        <>
            <FluxPane>
                <FluxDataTable
                    selected={selected}
                    onSelectedChange={(next) => setSelected(Array.isArray(next) ? next : [])}
                    items={filteredPeople}
                    limits={[]}
                    page={1}
                    perPage={6}
                    selectionMode={'multiple'}
                    total={filteredPeople.length}
                    uniqueKey={'id'}
                    isHoverable
                    columns={[
                        {
                            key: 'name',
                            cellProps: () => ({contentDirection: 'column'}),
                            header: <>{'Person'}</>,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return (
                                    <>
                                        <strong>{item.name}</strong>
                                        <small>{item.email}</small>
                                    </>
                                );
                            }
                        },
                        {
                            key: 'role',
                            header: <>{'Role'}</>,
                            isShrinking: true,
                            render: (row, rowIndex) => {
                                const slotProps = { item: row, index: rowIndex };
                                const { item } = slotProps;
                                return <>{item.role}</>;
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
                                    searchPlaceholder={'Search people...'}
                                >
                                    <FluxFilterOption
                                        label={'Role'}
                                        name={'role'}
                                        options={roleOptions}
                                    ></FluxFilterOption>
                                </FluxFilterBar>
                            </FluxTableBar>
                        </>
                    }
                    selection={({ count, clear }) => (
                        <>
                            <FluxFlexItem grow={1}>
                                <FluxFlex align={'center'} gap={9}>
                                    <span aria-live={'polite'}>
                                        {count}
                                        {' selected'}
                                    </span>
                                    <FluxSpacer></FluxSpacer>
                                    <FluxSecondaryButton
                                        iconLeading={'trash'}
                                        label={'Delete'}
                                        onClick={deleteSelected}
                                    ></FluxSecondaryButton>
                                    <FluxSecondaryButton
                                        label={'Clear'}
                                        onClick={() => {
                                            clear();
                                        }}
                                    ></FluxSecondaryButton>
                                </FluxFlex>
                            </FluxFlexItem>
                        </>
                    )}
                ></FluxDataTable>
            </FluxPane>
        </>
    );
}
