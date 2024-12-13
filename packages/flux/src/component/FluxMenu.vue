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
    import { useFocusZone } from '@basmilius/flux-internals';
    import { useTemplateRef } from 'vue';
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
