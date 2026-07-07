<template>
    <FluxPane>
        <FluxTable is-hoverable>
            <template #header>
                <FluxTableHeader :min-width="270"/>
                <FluxTableHeader is-shrinking>Members</FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="row in rows"
                :key="row.id">
                <FluxTableTreeCell
                    :level="row.level"
                    :color="levelColors[row.level] ?? 'gray'"
                    :is-expandable="row.hasChildren"
                    :is-expanded="!collapsed.has(row.id)"
                    @toggle="toggle(row.id)">
                    {{ row.name }}
                </FluxTableTreeCell>
                <FluxTableCell>{{ row.members ?? '—' }}</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow, FluxTableTreeCell } from '@flux-ui/components';
    import type { FluxColor } from '@flux-ui/types';
    import { computed, reactive } from 'vue';

    type Node = {
        readonly id: string;
        readonly name: string;
        readonly members?: number;
        readonly children?: Node[];
    };

    type Row = {
        readonly id: string;
        readonly name: string;
        readonly members?: number;
        readonly level: number;
        readonly hasChildren: boolean;
    };

    const levelColors: FluxColor[] = ['danger', 'warning', 'info'];

    const tree: Node[] = [
        {
            id: 'west',
            name: 'Pool West',
            children: [
                {
                    id: 'laurentius',
                    name: 'Laurentius',
                    children: [
                        {id: 'bernade', name: 'Bernade', members: 12},
                        {id: 'cornelis', name: 'Cornelis', members: 8}
                    ]
                },
                {id: 'reger', name: 'De Reger', members: 5}
            ]
        },
        {id: 'east', name: 'Pool East', members: 21}
    ];

    const collapsed = reactive(new Set<string>());

    const rows = computed<Row[]>(() => {
        const flat: Row[] = [];

        const walk = (nodes: Node[], level: number): void => {
            for (const node of nodes) {
                const hasChildren = !!node.children?.length;

                flat.push({id: node.id, name: node.name, members: node.members, level, hasChildren});

                if (hasChildren && !collapsed.has(node.id)) {
                    walk(node.children!, level + 1);
                }
            }
        };

        walk(tree, 0);

        return flat;
    });

    function toggle(id: string): void {
        if (collapsed.has(id)) {
            collapsed.delete(id);
        } else {
            collapsed.add(id);
        }
    }
</script>
