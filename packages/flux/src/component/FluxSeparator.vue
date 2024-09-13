<template>
    <div
        :class="axis === 'horizontal' ? styles.separatorHorizontal : styles.separatorVertical"
        role="separator"
        :aria-orientation="axis"/>
</template>

<script
    lang="ts"
    setup>
    import type { Axis } from '@/types';
    import styles from '@/css/component/Divider.module.scss';

    const {
        axis = 'horizontal'
    } = defineProps<{
        readonly axis?: Axis;
    }>();
</script>
