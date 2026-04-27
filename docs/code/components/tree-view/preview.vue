<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxTreeView
                    :level-colors="['primary', 'info', 'success']"
                    :options="options"
                    @click="onItemClick"
                    @dblclick="onItemDblClick"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxTreeView } from '@flux-ui/components';
    import type { FluxTreeViewOption } from '@flux-ui/types';

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
                        { id: 4, label: 'Desktops' }
                    ]
                },
                {
                    id: 5,
                    label: 'Phones',
                    children: [
                        { id: 6, label: 'Smartphones' },
                        { id: 7, label: 'Feature phones' }
                    ]
                }
            ]
        },
        {
            id: 8,
            label: 'Clothing',
            children: [
                { id: 9, label: 'Men' },
                { id: 10, label: 'Women' },
                { id: 11, label: 'Kids' }
            ]
        }
    ];

    function onItemClick(option: FluxTreeViewOption): void {
        console.log('click', option);
    }

    function onItemDblClick(option: FluxTreeViewOption): void {
        console.log('dblclick', option);
    }
</script>
