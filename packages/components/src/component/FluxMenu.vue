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
    import { useFocusZone } from '@flux-ui/internals';
    import { useTemplateRef, type VNode } from 'vue';
    import $style from '$flux/css/component/Menu.module.scss';

    defineProps<{
        readonly isLarge?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const elementRef = useTemplateRef('element');

    useFocusZone(elementRef, {
        direction: 'vertical'
    });
</script>
