<template>
    <FluxChip
        icon-leading="stars"
        is-selectable
        :is-selected="selected"
        label="Prospects"
        @click="selected = !selected"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxChip } from '@flux-ui/flux';
    import { ref } from 'vue';

    const selected = ref(true);
</script>
