<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormField label="Team">
                <FluxFormTreeViewSelect
                    v-model="selectedValue"
                    :options="options"
                    placeholder="Select a team..."/>
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

    // A color can be a FluxColor name or any CSS color string, and is set per option.
    const options = [
        {
            id: 1,
            label: 'Engineering',
            color: 'primary',
            children: [
                { id: 2, label: 'Frontend', color: '#6366f1' },
                { id: 3, label: 'Backend', color: '#0ea5e9' },
                { id: 4, label: 'Infrastructure', color: '#14b8a6' }
            ]
        },
        {
            id: 5,
            label: 'Design',
            color: 'warning',
            children: [
                { id: 6, label: 'Product design', color: '#f59e0b' },
                { id: 7, label: 'Brand', color: '#ec4899' }
            ]
        },
        {
            id: 8,
            label: 'Operations',
            color: 'success',
            children: [
                { id: 9, label: 'Support', color: '#10b981' },
                { id: 10, label: 'Finance', color: '#84cc16' }
            ]
        }
    ];
</script>
