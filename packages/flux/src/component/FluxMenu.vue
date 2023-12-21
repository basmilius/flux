<template>
    <nav
        ref="container"
        :class="isLarge ? styles.menuLarge : styles.menuDefault">
        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue';
    import { useFocusZone } from '@/composable';
    import styles from '@/css/components/Menu.module.scss';

    export interface Props {
        readonly isLarge?: boolean;
    }

    defineProps<Props>();

    const container = ref<HTMLDivElement>();

    useFocusZone(container, {
        direction: 'vertical'
    });
</script>
