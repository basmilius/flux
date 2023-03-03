<template>
    <flux-container
        class="flux-container-grid"
        :class="`flux-container-grid-${layout}`">
        <slot/>
    </flux-container>
</template>

<script
    lang="ts"
    setup>
    import { FluxContainer } from '.';

    export interface Props {
        readonly layout?: 'cards' | 'full' | 'sidebar-start' | 'sidebar-end';
    }

    withDefaults(defineProps<Props>(), {
        layout: 'full'
    });
</script>

<style lang="scss">
    .flux-container-grid {
        display: grid;
        align-items: start;
        gap: 30px;

        > * {
            max-width: 100%;
        }

        [lg] &-cards {
            align-items: stretch;
            grid-template-columns: 1fr 1fr 1fr;
        }

        [lg] &-full {
            grid-template-columns: 1fr;
        }

        [lg] &-sidebar-start {
            grid-template-columns: 360px minmax(0, 1fr);
        }

        [lg] &-sidebar-end {
            grid-template-columns: minmax(0, 1fr) 360px;
        }
    }
</style>
