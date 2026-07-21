<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormField label="Boards">
                <FluxFormTreeViewSelect
                    v-model="selectedValues"
                    :expanded-depth="2"
                    is-multiple
                    :level-colors="['gray', 'primary']"
                    :options="options"
                    placeholder="Select boards..."/>
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

    // The root is a grouping level, so it is opened by default and only the boards can be picked.
    const options = [
        {
            id: 1,
            label: 'Central Pool',
            selectable: false,
            children: [
                {
                    id: 2,
                    label: 'Aurora Foundation',
                    children: [
                        { id: 3, label: 'Aurora College' },
                        { id: 4, label: 'Aurora Primary' }
                    ]
                },
                {
                    id: 5,
                    label: 'Meridian Education',
                    children: [
                        { id: 6, label: 'Meridian Lyceum' }
                    ]
                },
                {
                    id: 7,
                    label: 'Northwind Schools',
                    children: [
                        { id: 8, label: 'Northwind Academy' },
                        { id: 9, label: 'Northwind Primary' }
                    ]
                }
            ]
        }
    ];
</script>
