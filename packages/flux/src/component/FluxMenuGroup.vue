<template>
    <div
        :class="isHorizontal ? styles.menuGroupHorizontal : styles.menuGroupVertical"
        role="group">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Menu.module.scss';

    export type Props = {
        readonly isHorizontal?: boolean;
    };

    defineProps<Props>();
</script>
