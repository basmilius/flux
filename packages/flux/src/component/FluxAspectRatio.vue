<template>
    <div
        :class="styles.aspectRatio"
        :style="{aspectRatio}">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Layout.module.scss';

    export interface Props {
        aspectRatio: number;
    }

    defineProps<Props>();
</script>
