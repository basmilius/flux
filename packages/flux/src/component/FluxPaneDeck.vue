<template>
    <FluxPane class="flux-pane-deck">
        <FluxAutoGrid
            :gap="0"
            :min-column-width="minColumnWidth">
            <slot/>
        </FluxAutoGrid>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import FluxAutoGrid from './FluxAutoGrid.vue';
    import FluxPane from './FluxPane.vue';

    export interface Props {
        readonly minColumnWidth: number;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-pane-deck {
        overflow: hidden;

        > .flux-auto-grid {
            margin-right: -1px;
            margin-bottom: -1px;

            > .flux-pane {
                border: 1px solid rgb(var(--gray-3));
                border-top: 0;
                border-left: 0;
                border-radius: 0;
                box-shadow: none;
            }
        }
    }
</style>
