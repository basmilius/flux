<template>
    <FluxFormTagsInput
        v-model="tags"
        disabled/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTagsInput } from '@flux-ui/components';
    import { ref } from 'vue';

    const tags = ref(['design', 'frontend']);
</script>
