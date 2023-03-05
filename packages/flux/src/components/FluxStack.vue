<template>
    <div
        class="flux-stack"
        :class="{
            'flux-stack-horizontal': axis === 'horizontal',
            'flux-stack-vertical': axis === 'vertical',
            'flux-stack-fill': isFill,
            'flux-stack-growing': isGrowing,
            'flux-stack-wrapping': isWrapping
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
    export interface Props {
        readonly axis?: 'horizontal' | 'vertical';
        readonly gap?: number;
        readonly isFill?: boolean;
        readonly isGrowing?: boolean;
        readonly isWrapping?: boolean;
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
            flex-flow: row;
        }

        &-vertical {
            flex-flow: column;
        }

        > .flux-separator {
            margin-top: 21px;
            margin-bottom: 21px;
        }

        &-fill {
            width: 100%;
        }

        &-growing > *:not(.flux-separator) {
            flex: 1 1 0;
        }

        &-wrapping {
            flex-wrap: wrap;
        }
    }
</style>
