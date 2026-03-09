<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxTreeView
                :level-colors="['primary', 'info', 'success']"
                :options="options"
                @click="onItemClick"
                @dblclick="onItemDblClick"/>
        </FluxPaneBody>
        <FluxPaneBody v-if="lastEvent">
            <p style="font-size: 14px; margin: 0;">
                <strong>{{ lastEvent.type }}</strong> — {{ lastEvent.label }}
                <span style="color: var(--foreground-secondary);">(id: {{ lastEvent.id }})</span>
            </p>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxTreeView } from '@flux-ui/components';
    import type { FluxTreeViewOption } from '@flux-ui/types';
    import { ref } from 'vue';

    const lastEvent = ref<{ type: string; id: string | number; label: string } | null>(null);

    const options: FluxTreeViewOption[] = [
        {
            id: 1,
            label: 'Electronics',
            children: [
                { id: 2, label: 'Laptops' },
                { id: 3, label: 'Desktops' },
                { id: 4, label: 'Smartphones' }
            ]
        },
        {
            id: 5,
            label: 'Clothing',
            children: [
                { id: 6, label: 'Men' },
                { id: 7, label: 'Women' }
            ]
        }
    ];

    function onItemClick(option: FluxTreeViewOption): void {
        lastEvent.value = { type: 'click', id: option.id, label: option.label };
    }

    function onItemDblClick(option: FluxTreeViewOption): void {
        lastEvent.value = { type: 'dblclick', id: option.id, label: option.label };
    }
</script>
