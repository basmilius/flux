<template>
    <FluxPublishButton
        :is-done="state % 3 === 2"
        :is-loading="state % 3 === 1"
        :label="state % 3 === 0 ? 'Publish' : (state % 3 === 1 ? 'Publishing' : 'Published')"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPublishButton, useInterval } from '@basmilius/flux';
    import { ref } from 'vue';

    const state = ref(0);

    useInterval(2000, () => state.value++);
</script>
