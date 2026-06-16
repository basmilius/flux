<template>
    <FluxFormCombobox
        v-model="value"
        is-creatable
        :options="options"
        placeholder="Pick or create a label"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormCombobox } from '@flux-ui/components';
    import type { FluxFormSelectValue } from '@flux-ui/types';
    import { ref } from 'vue';

    const value = ref<FluxFormSelectValue>(null);

    const options = [
        {label: 'Bug', value: 'bug'},
        {label: 'Feature', value: 'feature'},
        {label: 'Documentation', value: 'documentation'}
    ];
</script>
