<template>
    <FluxFormCombobox
        v-model="value"
        is-creatable
        is-multiple
        :options="options"
        placeholder="Add skills"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormCombobox } from '@flux-ui/components';
    import type { FluxFormSelectValue } from '@flux-ui/types';
    import { ref } from 'vue';

    const value = ref<FluxFormSelectValue>([]);

    const options = [
        {label: 'TypeScript', value: 'typescript'},
        {label: 'Vue', value: 'vue'},
        {label: 'CSS', value: 'css'}
    ];
</script>
