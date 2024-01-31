<template>
    <FluxButtonStack>
        <FluxPublishButton label="Publish"/>

        <FluxPublishButton
            is-loading
            label="Publishing"/>

        <FluxPublishButton
            is-done
            label="Published"/>

        <FluxPublishButton
            :is-done="state % 3 === 2"
            :is-loading="state % 3 === 1"
            :label="state % 3 === 0 ? 'Publish' : (state % 3 === 1 ? 'Publishing' : 'Published')"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPublishButton, useInterval } from '@fancee/flux';
    import { ref } from 'vue';

    const state = ref(0);

    useInterval(2000, () => state.value++);
</script>
