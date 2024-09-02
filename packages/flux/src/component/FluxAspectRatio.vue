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
    import styles from '@/css/component/Layout.module.scss';

    export type Props = {
        aspectRatio: number;
    };

    defineProps<Props>();
</script>
