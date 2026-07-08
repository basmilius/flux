<template>
    <FluxFormTagsInput
        v-model="tags"
        :delimiters="[' ', ',']"
        placeholder="Separate tags with a space or comma"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTagsInput } from '@flux-ui/components';
    import { ref } from 'vue';

    const tags = ref<string[]>([]);
</script>
