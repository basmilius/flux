<template>
    <div :class="$style.application">
        <slot name="menu"/>

        <div :class="$style.applicationBody">
            <slot/>
        </div>

        <slot name="side"/>

        <button
            type="button"
            aria-label="Close menu"
            :class="$style.applicationMenuBackdrop"
            @click="isMenuCollapsed = true"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useRemembered } from '@flux-ui/internals';
    import { onUnmounted, provide, ref, toRef, type VNode, watch } from 'vue';
    import { FluxApplicationInjectionKey, type FluxApplicationLayout } from '../data';
    import $style from '../css/component/Application.module.scss';

    const {
        showDesktopMenuToggle = false
    } = defineProps<{
        readonly showDesktopMenuToggle?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
        menu(): VNode[];
        side(): VNode[];
    }>();

    const isMenuCollapsed = useRemembered('application-menu-collapsed', true);
    const layout = ref<FluxApplicationLayout>('default');

    provide(FluxApplicationInjectionKey, {
        isMenuCollapsed,
        layout,
        showDesktopMenuToggle: toRef(() => showDesktopMenuToggle)
    });

    watch(isMenuCollapsed, collapsed => {
        if (typeof document === 'undefined') {
            return;
        }

        if (collapsed) {
            delete document.documentElement.dataset.applicationMenuOpen;
        } else {
            document.documentElement.dataset.applicationMenuOpen = '';
        }
    }, {immediate: true});

    onUnmounted(() => {
        if (typeof document !== 'undefined') {
            delete document.documentElement.dataset.applicationMenuOpen;
        }
    });
</script>
