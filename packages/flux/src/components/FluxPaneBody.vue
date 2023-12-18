<template>
    <div
        class="flux-pane-body"
        :class="{
            'is-content-centered': isContentCentered,
            'is-larger-padded': isLargerPadded
        }"
        :style="{
            '--span': span,
            gap: `${gap}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly gap?: number;
        readonly isContentCentered?: boolean;
        readonly isLargerPadded?: boolean;
        readonly span?: number;
    }

    withDefaults(defineProps<Props>(), {
        gap: 0,
        span: 1
    });
</script>

<style lang="scss">
    .flux-pane-body {
        display: flex;
        flex-flow: column;
        padding: 21px;

        &.is-content-centered {
            align-items: center;
            text-align: center;
        }

        &.is-larger-padded {
            padding: 36px;
        }

        > .flux-stack {
            flex-grow: 1;
        }
    }

    .flux-pane:not(.is-grid) > .flux-pane-body + .flux-pane-body {
        padding-top: 0;
    }

    .flux-pane.is-grid > .flux-pane-body {
        grid-column: span var(--span);
    }
</style>
