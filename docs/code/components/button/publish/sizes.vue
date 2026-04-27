<template>
    <FluxButtonStack>
        <FluxPublishButton
            size="small"
            :is-done="state % 3 === 2"
            :is-loading="state % 3 === 1"
            :label="state % 3 === 0 ? 'Publish' : (state % 3 === 1 ? 'Publishing' : 'Published')"/>

        <FluxPublishButton
            size="medium"
            :is-done="state % 3 === 2"
            :is-loading="state % 3 === 1"
            :label="state % 3 === 0 ? 'Publish' : (state % 3 === 1 ? 'Publishing' : 'Published')"/>

        <FluxPublishButton
            size="large"
            :is-done="state % 3 === 2"
            :is-loading="state % 3 === 1"
            :label="state % 3 === 0 ? 'Publish' : (state % 3 === 1 ? 'Publishing' : 'Published')"/>

        <FluxPublishButton
            size="xl"
            :is-done="state % 3 === 2"
            :is-loading="state % 3 === 1"
            :label="state % 3 === 0 ? 'Publish' : (state % 3 === 1 ? 'Publishing' : 'Published')"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxButtonStack, FluxPublishButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const state = ref(0);

    useInterval(2000, () => state.value++);
</script>
