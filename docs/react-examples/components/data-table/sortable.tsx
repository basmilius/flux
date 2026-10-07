import { useState } from 'react';
import {
    FluxDataTable,
    FluxPane,
    type FluxDataTableColumn,
    type FluxTableSort
} from '@flux-ui/react';

type Person = { id: number; name: string; role: string; commits: number };
const people: Person[] = [
    { id: 1, name: 'Ada Lovelace', role: 'Lead', commits: 1287 },
    { id: 2, name: 'Alan Turing', role: 'Engineer', commits: 942 },
    { id: 3, name: 'Grace Hopper', role: 'Engineer', commits: 1530 },
    { id: 4, name: 'Katherine Johnson', role: 'Manager', commits: 318 },
    { id: 5, name: 'Margaret Hamilton', role: 'Engineer', commits: 2041 }
];
const columns: FluxDataTableColumn<Person>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    {
        key: 'commits',
        header: 'Commits',
        sortable: true,
        align: 'end',
        isNumeric: true,
        render: (person) => person.commits.toLocaleString()
    }
];

export default function Example() {
    const [sort, setSort] = useState<{
        key: string;
        direction: Exclude<FluxTableSort, null>;
    } | null>({
        key: 'commits',
        direction: 'descending'
    });
    const items = [...people].sort((a, b) => {
        if (!sort) return 0;
        const key = sort.key as keyof Person;
        const left = a[key];
        const right = b[key];
        const order =
            typeof left === 'number' && typeof right === 'number'
                ? left - right
                : String(left).localeCompare(String(right));
        return sort.direction === 'ascending' ? order : -order;
    });

    return (
        <FluxPane>
            <FluxDataTable
                columns={columns}
                items={items}
                limits={[]}
                page={1}
                perPage={people.length}
                total={people.length}
                isHoverable
                sort={sort}
                onSortChange={setSort}
            />
        </FluxPane>
    );
}
