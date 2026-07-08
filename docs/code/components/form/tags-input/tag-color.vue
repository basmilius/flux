<template>
    <FluxFormTagsInput
        v-model="tags"
        tag-color="primary"
        placeholder="Add a tag"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTagsInput } from '@flux-ui/components';
    import { ref } from 'vue';

    const tags = ref(['design', 'frontend', 'vue']);
</script>
