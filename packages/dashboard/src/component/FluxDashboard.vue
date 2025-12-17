<template>
    <div :class="[$style.dashboard, isResizing && $style.isResizing]">
        <slot name="navigation"/>
        <slot name="menu"/>

        <div :class="$style.dashboardMount">
            <slot name="header"/>
            <slot/>
        </div>

        <slot name="side"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useRemembered } from '@flux-ui/internals';
    import { provide, ref, type VNode, watch } from 'vue';
    import { FluxDashboardInjectionKey } from '$fluxDashboard/data';
    import $style from '$fluxDashboard/css/component/Dashboard.module.scss';

    defineSlots<{
        default(): VNode;
        header?(): VNode;
        navigation?(): VNode;
        menu?(): VNode;
        side?(): VNode;
    }>();

    const isMenuCollapsed = useRemembered('dashboard-menu-collapsed', true);
    const isNavigationCollapsed = useRemembered('dashboard-navigation-collapsed', true);
    const isResizing = ref(false);

    provide(FluxDashboardInjectionKey, {
        isMenuCollapsed,
        isNavigationCollapsed
    });

    watch(isNavigationCollapsed, (_, __, onCleanup) => {
        let timeout: any;

        function onResize(): void {
            clearTimeout(timeout);
            isResizing.value = true;
            timeout = setTimeout(() => isResizing.value = false, 10);
        }

        window.addEventListener('resize', onResize, {passive: true});

        onCleanup(() => window.removeEventListener('resize', onResize));
    }, {immediate: true});
</script>
