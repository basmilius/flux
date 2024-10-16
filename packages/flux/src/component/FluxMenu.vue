<template>
    <nav
        ref="element"
        :class="isLarge ? $style.menuLarge : $style.menuNormal"
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
    import $style from '@/css/component/Menu.module.scss';

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
