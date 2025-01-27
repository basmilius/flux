<template>
    <FluxChip
        icon-before="stars"
        is-selectable
        :is-selected="selected"
        label="Prospects"
        @click="selected = !selected"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxChip } from '@basmilius/flux';
    import { ref } from 'vue';

    const selected = ref(true);
</script>
