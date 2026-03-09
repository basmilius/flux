<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormField label="Category">
                <FluxFormTreeViewSelect
                    v-model="selectedValue"
                    :level-colors="['primary', 'info', 'success']"
                    :options="options"
                    placeholder="Select a category..."/>
            </FluxFormField>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormField, FluxFormTreeViewSelect, FluxPane, FluxPaneBody } from '@flux-ui/components';
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
        },
        {
            id: 9,
            label: 'Clothing',
            children: [
                { id: 10, label: 'Men' },
                { id: 11, label: 'Women' },
                { id: 12, label: 'Kids' }
            ]
        },
        {
            id: 13,
            label: 'Home & Garden',
            children: [
                { id: 14, label: 'Furniture' },
                { id: 15, label: 'Garden tools' }
            ]
        }
    ];
</script>
