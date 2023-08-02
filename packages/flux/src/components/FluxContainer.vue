<template>
    <div class="flux-container">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useBreakpoints } from '@/composables';

    export interface Props {
        readonly gutter?: number;
    }

    withDefaults(defineProps<Props>(), {
        gutter: 30
    });

    const {maxWidth} = useBreakpoints();
</script>

<style lang="scss">
    .flux-container {
        margin-left: auto;
        margin-right: auto;
        padding-left: calc(v-bind(gutter) * 1px);
        padding-right: calc(v-bind(gutter) * 1px);
        max-width: calc(v-bind(maxWidth) * 1px);
        width: 100%;
    }
</style>
