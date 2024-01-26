<template>
    <Component
        :is="tag ?? 'div'"
        class="flux-stack"
        :class="{
            'is-horizontal': axis === 'horizontal',
            'is-vertical': axis === 'vertical',
            'is-centered': isCentered,
            'is-fill': isFill,
            'is-growing': isGrowing,
            'is-wrapping': isWrapping
        }"
        :style="{
            '--gap': `${gap}px`
        }">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly axis?: 'horizontal' | 'vertical';
        readonly gap?: number;
        readonly isCentered?: boolean;
        readonly isFill?: boolean;
        readonly isGrowing?: boolean;
        readonly isWrapping?: boolean;
        readonly tag?: keyof HTMLElementTagNameMap;
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

        &.is-horizontal {
            flex-direction: row;
        }

        &.is-vertical {
            flex-flow: column;
        }

        &.is-centered {
            place-items: center;
            place-content: center;
        }

        &.is-fill {
            width: 100%;
        }

        &.is-wrapping {
            flex-wrap: wrap;
        }

        &.is-growing > *:not(.flux-separator) {
            flex: 1 1 0;
        }
    }
</style>
