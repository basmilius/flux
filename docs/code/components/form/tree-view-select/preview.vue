<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxFormTreeViewSelect
                    v-model="selectedValue"
                    :level-colors="['primary', 'info', 'success']"
                    :options="options"
                    placeholder="Select a category..."/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormTreeViewSelect, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const selectedValue = ref<number | null>(null);

    const options = [
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
</script>
