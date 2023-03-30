<template>
    <nav class="flux-table-actions">
        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
</script>

<style lang="scss">
    .flux-table-actions {
        display: flex;
        margin: -3px;
        flex-flow: row nowrap;
        gap: 1px;
    }
</style>
