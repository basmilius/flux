<template>
    <nav
        ref="element"
        :class="[isLarge ? $style.menuLarge : $style.menuNormal, coneActive && $style.menuConeActive]"
        role="menu"
        aria-orientation="vertical">
        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { useFocusZone } from '@flux-ui/internals';
    import { computed, toRef, useTemplateRef, type VNode } from 'vue';
    import { useMenuFlyoutContext } from '~flux/components/composable/private';
    import $style from '~flux/components/css/component/Menu.module.scss';

    const {
        debugCone = false
    } = defineProps<{
        readonly debugCone?: boolean;
        readonly isLarge?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const elementRef = useTemplateRef('element');

    useFocusZone(elementRef, {
        direction: 'vertical'
    });

    const menuFlyout = useMenuFlyoutContext({
        debugCone: toRef(() => debugCone)
    });

    const coneActive = computed(() => !!menuFlyout.activeCone.value);
</script>
