<template>
    <FluxFormCombobox
        v-model="value"
        :options="options"
        placeholder="Select a country"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormCombobox } from '@flux-ui/components';
    import type { FluxFormSelectValue } from '@flux-ui/types';
    import { ref } from 'vue';

    const value = ref<FluxFormSelectValue>(null);

    const options = [
        {label: 'Belgium', value: 'be'},
        {label: 'Germany', value: 'de'},
        {label: 'Netherlands', value: 'nl'},
        {label: 'United Kingdom', value: 'uk'}
    ];
</script>
