<template>
    <FluxStack
        :class="clsx(
            !!floatingMode ? styles.toolbarFloating : styles.toolbarFlat,
            floatingMode === 'free' && styles.isFree,
            floatingMode === 'top-end' && styles.isTopEnd,
            floatingMode === 'top-start' && styles.isTopStart,
            floatingMode === 'bottom-end' && styles.isBottomEnd,
            floatingMode === 'bottom-start' && styles.isBottomStart,
        )"
        axis="horizontal"
        :gap="6"
        tag="nav">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import FluxStack from './FluxStack.vue';
    import styles from '@/css/component/Toolbar.module.scss';

    defineProps<{
        readonly floatingMode?: 'free' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
