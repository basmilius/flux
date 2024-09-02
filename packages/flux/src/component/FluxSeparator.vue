<template>
    <div
        :class="axis === 'horizontal' ? styles.separatorHorizontal : styles.separatorVertical"
        role="separator"/>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Divider.module.scss';

    export type Props = {
        readonly axis?: 'horizontal' | 'vertical';
    };

    withDefaults(defineProps<Props>(), {
        axis: 'horizontal'
    });
</script>
