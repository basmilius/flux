<template>
    <FluxPane>
        <FluxTable is-hoverable>
            <template #header>
                <FluxTableHeader :min-width="270"/>
                <FluxTableHeader is-shrinking>Owner</FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="row in rows"
                :key="row.id">
                <FluxTableTreeCell
                    :level="row.level"
                    :color="row.color"
                    :is-expandable="row.hasChildren"
                    :is-expanded="!collapsed.has(row.id)"
                    @toggle="toggle(row.id)">
                    {{ row.name }}
                </FluxTableTreeCell>
                <FluxTableCell>{{ row.owner ?? '—' }}</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow, FluxTableTreeCell } from '@flux-ui/components';
    import { computed, reactive } from 'vue';

    type Node = {
        readonly id: string;
        readonly name: string;
        readonly color: string;
        readonly owner?: string;
        readonly children?: Node[];
    };

    type Row = {
        readonly id: string;
        readonly name: string;
        readonly color: string;
        readonly owner?: string;
        readonly level: number;
        readonly hasChildren: boolean;
    };

    const tree: Node[] = [
        {
            id: 'design',
            name: 'Design system',
            color: '#8b5cf6',
            children: [
                {
                    id: 'tokens',
                    name: 'Tokens',
                    color: '#ec4899',
                    children: [
                        {id: 'color', name: 'Colour', color: '#f97316', owner: 'Anouk'},
                        {id: 'type', name: 'Typography', color: '#f97316', owner: 'Milan'}
                    ]
                },
                {id: 'icons', name: 'Icons', color: '#ec4899', owner: 'Sara'}
            ]
        },
        {id: 'brand', name: 'Brand guidelines', color: '#8b5cf6', owner: 'Team'}
    ];

    const collapsed = reactive(new Set<string>());

    const rows = computed<Row[]>(() => {
        const flat: Row[] = [];

        const walk = (nodes: Node[], level: number): void => {
            for (const node of nodes) {
                const hasChildren = !!node.children?.length;

                flat.push({id: node.id, name: node.name, color: node.color, owner: node.owner, level, hasChildren});

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
