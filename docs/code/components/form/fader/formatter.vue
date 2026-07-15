<template>
    <FluxFormFader
        label="Frequency"
        v-model="value"
        :formatter="percentage"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormFader } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(41);

    function percentage(value: number): string {
        return `${value}%`;
    }
</script>
