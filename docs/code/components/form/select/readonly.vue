<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxFormField label="Country">
                <FluxFormSelect
                    v-model="selectedValue"
                    is-readonly
                    :options="options"
                    placeholder="Select an option..."/>
            </FluxFormField>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormField, FluxFormSelect, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const selectedValue = ref(2);

    const options = [
        { label: 'Belgium', value: 1 },
        { label: 'Germany', value: 2 },
        { label: 'France', value: 3 },
        { label: 'Netherlands', value: 4 },
        { label: 'Spain', value: 5 },
        { label: 'United Kingdom', value: 6 }
    ];
</script>
