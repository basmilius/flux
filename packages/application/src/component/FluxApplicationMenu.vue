<template>
    <aside
        :class="$style.applicationMenu"
        :data-collapsed="isMenuCollapsed ? '' : undefined"
        :data-collapsible="showDesktopMenuToggle ? '' : undefined">
        <FluxMenu
            v-if="slots.header"
            v-height-transition
            :class="$style.applicationMenuHeader">
            <slot name="header"/>
        </FluxMenu>

        <div :class="$style.applicationMenuStage">
            <div
                :class="$style.applicationMenuTrack"
                :style="{'--view-index': viewIndex}">
                <FluxMenu :class="$style.applicationMenuPanel">
                    <slot/>
                </FluxMenu>

                <slot name="context"/>
            </div>
        </div>

        <FluxFadeTransition>
            <FluxMenu
                v-if="slots.footer && isMainMenuVisible"
                :class="$style.applicationMenuFooter">
                <slot name="footer"/>
            </FluxMenu>
        </FluxFadeTransition>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import { FluxFadeTransition, FluxMenu } from '@flux-ui/components';
    import { vHeightTransition } from '@flux-ui/internals';
    import type { VNode } from 'vue';
    import { useApplicationInjection, useApplicationMenu } from '../composable';
    import $style from '~flux/application/css/component/ApplicationMenu.module.scss';

    const slots = defineSlots<{
        default(): VNode;
        context?(): VNode;
        footer?(): VNode;
        header?(): VNode;
    }>();

    const {isMenuCollapsed, showDesktopMenuToggle} = useApplicationInjection();
    const {isMainMenuVisible, viewIndex} = useApplicationMenu();
</script>
