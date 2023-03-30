<template>
    <div
        class="flux-predefined-grid"
        :class="`flux-predefined-grid-${layout}`">
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
    .flux-predefined-grid {
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

        [lg] &-two-column {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
