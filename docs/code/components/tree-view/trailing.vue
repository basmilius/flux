<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxTreeView
                aria-label="Product categories"
                :level-colors="['primary', 'info', 'success']"
                :options="options">
                <template #trailing="{ node }">
                    <FluxBadge
                        v-if="counts[node.id]"
                        :label="`${counts[node.id]}`"/>
                </template>
            </FluxTreeView>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxPane, FluxPaneBody, FluxTreeView } from '@flux-ui/components';
    import type { FluxTreeViewOption } from '@flux-ui/types';

    const counts: Record<string | number, number> = {
        3: 12,
        4: 8,
        5: 4,
        7: 21,
        8: 3
    };

    const options: FluxTreeViewOption[] = [
        {
            id: 1,
            label: 'Electronics',
            children: [
                {
                    id: 2,
                    label: 'Computers',
                    children: [
                        { id: 3, label: 'Laptops' },
                        { id: 4, label: 'Desktops' },
                        { id: 5, label: 'Tablets' }
                    ]
                },
                {
                    id: 6,
                    label: 'Phones',
                    children: [
                        { id: 7, label: 'Smartphones' },
                        { id: 8, label: 'Feature phones' }
                    ]
                }
            ]
        }
    ];
</script>
