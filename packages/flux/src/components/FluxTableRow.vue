<template>
    <tr class="flux-table-row">
        <slot/>
    </tr>
</template>

<script
    lang="ts"
    setup>
</script>

<style lang="scss">
    @layer component {
        .flux-table-row {
            margin: 0;
            padding: 0;
        }
    }
</style>
