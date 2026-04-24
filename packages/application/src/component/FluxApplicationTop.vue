<template>
    <header :class="y > 1 ? $style.applicationTopScrolled : $style.applicationTop">
        <div :class="$style.applicationTopBar">
            <FluxApplicationMenuToggle :class="!showDesktopMenuToggle && $style.applicationTopMenuToggleHidden"/>

            <slot name="start"/>

            <FluxFadeTransition>
                <FluxIcon
                    v-if="icon"
                    :key="icon"
                    :name="icon"/>
            </FluxFadeTransition>

            <FluxFadeTransition>
                <span
                    v-if="title"
                    :key="title"
                    :class="$style.applicationTopBarTitle">
                    {{ title }}
                </span>
            </FluxFadeTransition>

            <FluxSpacer/>

            <slot name="end"/>
        </div>

        <FluxRouteTransition>
            <div
                v-if="slots.tabs"
                :class="clsx(
                    layout === 'default' && $style.applicationTopTabsDefault,
                    layout === 'dashboard' && $style.applicationTopTabsDashboard,
                    layout === 'full' && $style.applicationTopTabsFull,
                    layout === 'medium' && $style.applicationTopTabsMedium,
                    layout === 'narrow' && $style.applicationTopTabsNarrow
                )">
                <FluxTabBar>
                    <slot name="tabs"/>
                </FluxTabBar>
            </div>

            <div v-else/>
        </FluxRouteTransition>
    </header>
</template>

<script
    lang="ts"
    setup>
    import { FluxFadeTransition, FluxIcon, FluxRouteTransition, FluxSpacer, FluxTabBar } from '@flux-ui/components';
    import { useScrollPosition } from '@flux-ui/internals';
    import type { FluxIconName } from '@flux-ui/types';
    import clsx from 'clsx';
    import type { VNode } from 'vue';
    import { useApplicationInjection } from '../composable';
    import FluxApplicationMenuToggle from './FluxApplicationMenuToggle.vue';
    import $style from '../css/component/ApplicationTop.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly title?: string;
    }>();

    const slots = defineSlots<{
        end?(): VNode;
        start?(): VNode;
        tabs?(): VNode;
    }>();

    const {layout, showDesktopMenuToggle} = useApplicationInjection();
    const {y} = useScrollPosition();
</script>
