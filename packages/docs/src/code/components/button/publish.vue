<template>
    <flux-button-stack>
        <flux-publish-button label="Publish"/>

        <flux-publish-button
            is-loading
            label="Publishing"/>

        <flux-publish-button
            is-done
            label="Published"/>

        <flux-publish-button
            :is-done="state % 3 === 2"
            :is-loading="state % 3 === 1"
            :label="state % 3 === 0 ? 'Publish' : (state % 3 === 1 ? 'Publishing' : 'Published')"/>
    </flux-button-stack>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxButtonStack,
        FluxPublishButton,
        useInterval
    } from '@fancee/flux';
    import { ref } from 'vue';

    const state = ref(0);

    useInterval(2000, () => state.value++);
</script>
