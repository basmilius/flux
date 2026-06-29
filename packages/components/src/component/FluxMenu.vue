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
    import { computed, inject, provide, toRef, useTemplateRef, type VNode } from 'vue';
    import { useMenuFlyoutContext } from '~flux/components/composable/private';
    import { FluxFlyoutInjectionKey, FluxMenuPersistentInjectionKey } from '~flux/components/data';
    import $style from '~flux/components/css/component/Menu.module.scss';

    const {
        debugCone = false,
        isPersistent
    } = defineProps<{
        readonly debugCone?: boolean;
        readonly isLarge?: boolean;
        readonly isPersistent?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const elementRef = useTemplateRef('element');
    const flyout = inject(FluxFlyoutInjectionKey, null);
    const parentPersistent = inject(FluxMenuPersistentInjectionKey, null);

    useFocusZone(elementRef, {
        direction: 'vertical',
        ignore: '[data-flux-menu-pane]'
    });

    const menuFlyout = useMenuFlyoutContext({
        debugCone: toRef(() => debugCone),
        onCloseAll: flyout ? () => flyout.close() : undefined
    });

    provide(FluxMenuPersistentInjectionKey, computed(() => isPersistent || (parentPersistent?.value ?? false)));

    // Dim sibling items only in the menu that actually owns the active cone's opener (the trigger lives
    // in this nav), so ancestor menus stay interactive while a deeper submenu's cone is active.
    const coneActive = computed(() => {
        if (!menuFlyout.activeCone.value) {
            return false;
        }

        const trigger = menuFlyout.getActiveConeTrigger();
        const nav = elementRef.value;

        return !!trigger && !!nav && nav.contains(trigger);
    });
</script>
