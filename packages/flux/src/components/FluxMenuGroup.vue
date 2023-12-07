<template>
    <nav :class="isHorizontal ? styles.menuGroupHorizontal : styles.menuGroupVertical">
        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/components/Menu.module.scss';

    export interface Props {
        readonly isHorizontal?: boolean;
    }

    defineProps<Props>();
</script>
