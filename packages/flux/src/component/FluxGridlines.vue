<template>
    <div
        :class="styles.gridLines"
        :style="{
            '--size': `${size}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Visual.module.scss';

    export type Props = {
        readonly size: number;
    };

    withDefaults(defineProps<Props>(), {
        size: 30
    });
</script>
