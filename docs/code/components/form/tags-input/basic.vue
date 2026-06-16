<template>
    <FluxFormTagsInput
        v-model="tags"
        :max="5"
        placeholder="Up to 5 tags"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTagsInput } from '@flux-ui/components';
    import { ref } from 'vue';

    const tags = ref<string[]>([]);
</script>
