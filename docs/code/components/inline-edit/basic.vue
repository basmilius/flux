<template>
    <FluxInlineEdit
        v-model="value"
        placeholder="Add a title..."/>
</template>

<script
    setup
    lang="ts">
    import { FluxInlineEdit } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref('');
</script>
