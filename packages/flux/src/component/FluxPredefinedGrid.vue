<template>
    <div
        class="flux-predefined-grid"
        :class="`is-${layout}`">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly layout?: 'cards' | 'full' | 'sidebar-start' | 'sidebar-end' | 'two-column';
    }

    withDefaults(defineProps<Props>(), {
        layout: 'full'
    });
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-predefined-grid {
        display: grid;
        align-items: start;
        gap: 30px;

        > * {
            max-width: 100%;
        }

        @include flux.breakpoint-up(lg) {
            &.is-cards {
                align-items: stretch;
                grid-template-columns: 1fr 1fr 1fr;
            }

            &.is-full {
                grid-template-columns: 1fr;
            }

            &.is-sidebar-start {
                grid-template-columns: 360px minmax(0, 1fr);
            }

            &.is-sidebar-end {
                grid-template-columns: minmax(0, 1fr) 360px;
            }

            &.is-two-column {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
    }
</style>
