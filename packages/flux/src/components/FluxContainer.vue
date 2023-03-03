<template>
    <div class="flux-container">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useBreakpoints } from '../composables';

    const {maxWidth} = useBreakpoints();
</script>

<style lang="scss">
    .flux-container {
        margin-left: auto;
        margin-right: auto;
        padding-left: 30px;
        padding-right: 30px;
        max-width: calc(v-bind(maxWidth) * 1px);
    }
</style>
