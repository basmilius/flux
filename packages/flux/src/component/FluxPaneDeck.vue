<template>
    <div :class="$style.paneDeck">
        <FluxAutoGrid
            :gap="0"
            :min-column-width="minColumnWidth">
            <slot/>
        </FluxAutoGrid>
    </div>
</template>

<script
    lang="ts"
    setup>
    import FluxAutoGrid from './FluxAutoGrid.vue';
    import $style from '@/css/component/Pane.module.scss';

    defineProps<{
        readonly minColumnWidth: number;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
