<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormField label="Locations">
                <FluxFormTreeViewSelect
                    v-model="selectedValues"
                    :options="options"
                    is-cascading
                    is-multiple
                    placeholder="Select locations..."/>
            </FluxFormField>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormField, FluxFormTreeViewSelect, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const selectedValues = ref<number[]>([]);

    const options = [
        {
            id: 1,
            label: 'Netherlands',
            color: 'primary',
            children: [
                {
                    id: 2,
                    label: 'North Holland',
                    color: 'info',
                    children: [
                        { id: 3, label: 'Amsterdam' },
                        { id: 4, label: 'Haarlem' }
                    ]
                },
                {
                    id: 5,
                    label: 'Utrecht',
                    color: 'info',
                    children: [
                        { id: 6, label: 'Utrecht' },
                        { id: 7, label: 'Amersfoort' }
                    ]
                }
            ]
        },
        {
            id: 8,
            label: 'Belgium',
            color: 'primary',
            children: [
                {
                    id: 9,
                    label: 'Flanders',
                    color: 'info',
                    children: [
                        { id: 10, label: 'Antwerp' },
                        { id: 11, label: 'Ghent' }
                    ]
                }
            ]
        }
    ];
</script>
