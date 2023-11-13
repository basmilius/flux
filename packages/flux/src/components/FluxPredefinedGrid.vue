<template>
    <div
        :class="{
            [styles.predefinedGrid]: true,
            [styles.predefinedGridCards]: layout === 'cards',
            [styles.predefinedGridFull]: layout === 'full',
            [styles.predefinedGridSidebarStart]: layout === 'sidebar-start',
            [styles.predefinedGridSidebarEnd]: layout === 'sidebar-end',
            [styles.predefinedGridTwoColumn]: layout === 'two-column'
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Layout.module.scss';

    export interface Props {
        readonly layout?: 'cards' | 'full' | 'sidebar-start' | 'sidebar-end' | 'two-column';
    }

    withDefaults(defineProps<Props>(), {
        layout: 'full'
    });
</script>
