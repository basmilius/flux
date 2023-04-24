<template>
    <flux-actions class="flux-table-actions">
        <slot/>
    </flux-actions>
</template>

<script
    lang="ts"
    setup>
    import { FluxActions } from '.';
</script>

<style lang="scss">
    .flux-table-actions {
        margin: -3px 0 -3px -3px;
    }

    .flux-pane > .flux-table .flux-table-actions {
        margin-right: -3px;
    }
</style>
