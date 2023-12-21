<template>
    <FluxPane :class="styles.paneDeck">
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
    import styles from '@/css/components/Pane.module.scss';
    import FluxAutoGrid from './FluxAutoGrid.vue';
    import FluxPane from './FluxPane.vue';

    export interface Props {
        readonly minColumnWidth: number;
    }

    defineProps<Props>();
</script>
