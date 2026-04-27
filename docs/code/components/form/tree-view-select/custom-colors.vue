<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormField label="Category">
                <FluxFormTreeViewSelect
                    v-model="selectedValue"
                    :level-colors="['#6366f1', '#f59e0b', '#10b981']"
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
                        { id: 4, label: 'Desktops' }
                    ]
                },
                {
                    id: 5,
                    label: 'Phones',
                    children: [
                        { id: 6, label: 'Smartphones' }
                    ]
                }
            ]
        },
        {
            id: 7,
            label: 'Clothing',
            children: [
                { id: 8, label: 'Men' },
                { id: 9, label: 'Women' }
            ]
        }
    ];
</script>
