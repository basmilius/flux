<template>
    <div
        class="flux-stack"
        :class="{
            'flux-stack-horizontal': axis === 'horizontal',
            'flux-stack-vertical': axis === 'vertical',
            'flux-stack-growing': isGrowing
        }"
        :style="{
            '--gap': `${gap}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    interface Props {
        readonly axis?: 'horizontal' | 'vertical';
        readonly gap?: number;
        readonly isGrowing?: boolean;
    }

    withDefaults(defineProps<Props>(), {
        axis: 'vertical',
        gap: 30
    });
</script>

<style lang="scss">
    .flux-stack {
        display: flex;
        gap: var(--gap);

        &-horizontal {
            align-items: stretch;
        }

        &-vertical {
            flex-flow: column;
        }

        > .flux-separator {
            margin-top: 21px;
            margin-bottom: 21px;
        }

        &-growing > *:not(.flux-separator) {
            flex: 1 1 0;
        }
    }
</style>
