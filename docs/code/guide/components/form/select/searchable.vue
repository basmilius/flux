<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormSelect
                v-model="selectedValue"
                :options="options"
                is-searchable
                placeholder="Select an option..."/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormSelect, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const selectedValue = ref(0);

    const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
        { label: 'Option 4', value: 4 },
        { label: 'Option 5', value: 5 },
        { label: 'Option 6', value: 6 }
    ];
</script>
