<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormField label="Product">
                <FluxFormTreeViewSelect
                    v-model="selectedValue"
                    :level-colors="['gray', 'primary']"
                    :options="options"
                    placeholder="Select a product..."/>
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

    // Parent nodes have `selectable: false` — only leaves can be selected.
    const options = [
        {
            id: 1,
            label: 'Electronics',
            selectable: false,
            children: [
                { id: 2, label: 'MacBook Pro 14"' },
                { id: 3, label: 'MacBook Air 13"' },
                { id: 4, label: 'iPhone 16 Pro' }
            ]
        },
        {
            id: 5,
            label: 'Clothing',
            selectable: false,
            children: [
                { id: 6, label: 'Classic T-shirt' },
                { id: 7, label: 'Slim-fit Jeans' }
            ]
        },
        {
            id: 8,
            label: 'Home & Garden',
            selectable: false,
            children: [
                { id: 9, label: 'Desk Lamp' },
                { id: 10, label: 'Bookshelf' }
            ]
        }
    ];
</script>
