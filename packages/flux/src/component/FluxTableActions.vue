<template>
    <FluxActions class="flux-table-actions">
        <slot/>
    </FluxActions>
</template>

<script
    lang="ts"
    setup>
    import FluxActions from './FluxActions.vue';
</script>

<style lang="scss">
    .flux-table-actions {
        margin: -3px 0 -3px -3px;

        > .flux-action {
            --button-background-hover: rgb(var(--gray-3));
            --button-background-active: rgb(var(--gray-4));
        }
    }

    .flux-pane > .flux-table .flux-table-actions {
        margin-right: -3px;
    }
</style>
