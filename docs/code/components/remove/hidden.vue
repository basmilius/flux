<template>
    <div
        :style="{position: 'relative', width: '90px', height: '90px', background: 'var(--surface-sunken)', borderRadius: '9px'}"
        @focusin="isVisible = true"
        @focusout="isVisible = false"
        @mouseenter="isVisible = true"
        @mouseleave="isVisible = false">
        <FluxRemove :is-hidden="!isVisible"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxRemove } from '@flux-ui/components';
    import { ref } from 'vue';

    const isVisible = ref(false);
</script>
