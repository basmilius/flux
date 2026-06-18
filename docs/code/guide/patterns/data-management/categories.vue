<template>
    <Preview>
        <FluxContextMenu>
            <FluxPane style="max-width: 360px">
                <FluxPaneHeader title="Categories"/>

                <FluxPaneBody>
                    <FluxTreeView
                        :level-colors="['primary', 'info', 'success']"
                        :options="options"/>
                </FluxPaneBody>
            </FluxPane>

            <template #menu>
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="file-plus"
                            label="New subcategory"
                            type="button"/>

                        <FluxMenuItem
                            icon-leading="pen"
                            label="Rename"
                            type="button"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="trash"
                            is-destructive
                            label="Delete"
                            type="button"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </template>
        </FluxContextMenu>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxTreeViewOption } from '@flux-ui/types';
    import { FluxContextMenu, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSeparator, FluxTreeView } from '@flux-ui/components';

    const options: FluxTreeViewOption[] = [
        {
            id: 1,
            label: 'Electronics',
            children: [
                {
                    id: 2,
                    label: 'Computers',
                    children: [
                        {id: 3, label: 'Laptops'},
                        {id: 4, label: 'Desktops'}
                    ]
                },
                {
                    id: 5,
                    label: 'Phones',
                    children: [
                        {id: 6, label: 'Smartphones'},
                        {id: 7, label: 'Accessories'}
                    ]
                }
            ]
        },
        {
            id: 8,
            label: 'Clothing',
            children: [
                {id: 9, label: 'Men'},
                {id: 10, label: 'Women'}
            ]
        }
    ];
</script>
