<template>
    <div
        :class="styles.spacing"
        :style="{
            '--size': `${spacingSize}px`
        }"/>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue-demi';
    import styles from '@/css/components/Layout.module.scss';

    const spacings = [
        0,
        3,
        6,
        9,
        12,
        15,
        18,
        24,
        30,
        36,
        42,
        48,
        54,
        60,
        72,
        84,
        90,
        120
    ] as const;

    export interface Props {
        readonly size: keyof typeof spacings;
    }

    const props = defineProps<Props>();

    const spacingSize = computed(() => spacings[props.size]);
</script>
