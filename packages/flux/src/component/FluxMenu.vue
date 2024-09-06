<template>
    <nav
        ref="element"
        :class="isLarge ? styles.menuLarge : styles.menuNormal"
        role="menu"
        aria-orientation="vertical">
        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { useTemplateRef } from 'vue';
    import { useFocusZone } from '@/composable';
    import styles from '@/css/component/Menu.module.scss';

    defineProps<{
        readonly isLarge?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const elementRef = useTemplateRef('element');

    useFocusZone(elementRef, {
        direction: 'vertical'
    });
</script>
