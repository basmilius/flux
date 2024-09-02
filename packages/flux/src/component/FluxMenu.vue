<template>
    <nav
        ref="elementRef"
        :class="isLarge ? styles.menuLarge : styles.menuNormal"
        role="menu"
        aria-orientation="vertical">
        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue';
    import { useFocusZone } from '@/composable';
    import styles from '@/css/component/Menu.module.scss';

    export type Props = {
        readonly isLarge?: boolean;
    };

    defineProps<Props>();

    const elementRef = ref<HTMLDivElement>();

    useFocusZone(elementRef, {
        direction: 'vertical'
    });
</script>
