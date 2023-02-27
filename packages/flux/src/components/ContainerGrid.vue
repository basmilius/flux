<template>
    <div
        class="flux-container-grid"
        :class="`flux-container-grid-${layout}`">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    interface Props {
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

        &-cards {
            align-items: stretch;
            grid-template-columns: 1fr 1fr 1fr;
        }

        &-full {
            grid-template-columns: 1fr;
        }

        &-sidebar-start {
            grid-template-columns: 360px 2fr;
        }

        &-sidebar-end {
            grid-template-columns: 2fr 360px;
        }
    }
</style>
