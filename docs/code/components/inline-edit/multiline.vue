<template>
    <FluxInlineEdit
        v-model="value"
        multiline
        placeholder="Add a description..."/>
</template>

<script
    setup
    lang="ts">
    import { FluxInlineEdit } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref('A short description that you can edit in place.');
</script>
