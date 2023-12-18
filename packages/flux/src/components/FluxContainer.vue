<template>
    <div
        class="flux-container"
        :style="{
            '--gutter': `${gutter}px`,
            maxWidth: `${maxWidth}px`
        }">
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
        padding-left: var(--gutter);
        padding-right: var(--gutter);
        width: 100%;
    }
</style>
