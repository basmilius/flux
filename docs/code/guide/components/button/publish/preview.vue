<template>
    <Preview>
        <FluxPublishButton
            :is-done="state % 3 === 2"
            :is-loading="state % 3 === 1"
            :label="state % 3 === 0 ? 'Publish' : (state % 3 === 1 ? 'Publishing' : 'Published')"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxPublishButton } from '@flux-ui/components';
    import { useInterval } from '@flux-ui/internals';
    import { ref } from 'vue';

    const state = ref(0);

    useInterval(2000, () => state.value++);
</script>
