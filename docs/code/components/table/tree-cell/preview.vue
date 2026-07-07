<template>
    <FluxPane>
        <FluxTable is-hoverable>
            <template #header>
                <FluxTableHeader :min-width="270"/>
                <FluxTableHeader is-shrinking>Kind</FluxTableHeader>
                <FluxTableHeader
                    is-shrinking
                    is-numeric>Size</FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="row in rows"
                :key="row.id">
                <FluxTableTreeCell
                    :level="row.level"
                    :is-expandable="row.hasChildren"
                    :is-expanded="!collapsed.has(row.id)"
                    @toggle="toggle(row.id)">
                    {{ row.name }}
                </FluxTableTreeCell>
                <FluxTableCell>{{ row.hasChildren ? 'Folder' : 'File' }}</FluxTableCell>
                <FluxTableCell is-numeric>{{ row.size ?? '—' }}</FluxTableCell>
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
        readonly size?: string;
        readonly children?: Node[];
    };

    type Row = {
        readonly id: string;
        readonly name: string;
        readonly size?: string;
        readonly level: number;
        readonly hasChildren: boolean;
    };

    const tree: Node[] = [
        {
            id: 'src',
            name: 'src',
            children: [
                {
                    id: 'components',
                    name: 'components',
                    children: [
                        {id: 'button', name: 'FluxButton.vue', size: '4 KB'},
                        {id: 'table', name: 'FluxTable.vue', size: '12 KB'}
                    ]
                },
                {id: 'index', name: 'index.ts', size: '1 KB'}
            ]
        },
        {id: 'package', name: 'package.json', size: '2 KB'}
    ];

    const collapsed = reactive(new Set<string>());

    const rows = computed<Row[]>(() => {
        const flat: Row[] = [];

        const walk = (nodes: Node[], level: number): void => {
            for (const node of nodes) {
                const hasChildren = !!node.children?.length;

                flat.push({id: node.id, name: node.name, size: node.size, level, hasChildren});

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
