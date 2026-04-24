<template>
    <aside
        :class="$style.applicationMenu"
        :data-collapsed="isMenuCollapsed ? '' : undefined"
        :data-collapsible="showDesktopMenuToggle ? '' : undefined">
        <FluxMenu
            v-if="slots.header"
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

        <nav
            v-if="showPageIndicator && totalLevels > 1"
            :class="$style.applicationMenuPageIndicator"
            aria-label="Menu levels">
            <button
                v-for="level in totalLevels"
                :key="level - 1"
                type="button"
                :class="[
                    $style.applicationMenuPageIndicatorDot,
                    (level - 1) === viewIndex && $style.applicationMenuPageIndicatorDotActive
                ]"
                :aria-current="(level - 1) === viewIndex ? 'true' : undefined"
                :aria-label="(level - 1) === 0 ? 'Hoofdmenu' : `Niveau ${level - 1}`"
                @click="goToLevel(level - 1)"/>
        </nav>

        <FluxMenu
            v-if="slots.footer"
            :class="$style.applicationMenuFooter"
            :data-hidden="!isMainMenuVisible ? '' : undefined">
            <slot name="footer"/>
        </FluxMenu>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu } from '@flux-ui/components';
    import { type VNode } from 'vue';
    import { useApplicationInjection, useApplicationMenu } from '../composable';
    import $style from '../css/component/ApplicationMenu.module.scss';

    const {
        showPageIndicator = true
    } = defineProps<{
        readonly showPageIndicator?: boolean;
    }>();

    const slots = defineSlots<{
        default(): VNode;
        context?(): VNode;
        footer?(): VNode;
        header?(): VNode;
    }>();

    const {isMenuCollapsed, showDesktopMenuToggle} = useApplicationInjection();
    const {goToLevel, isMainMenuVisible, totalLevels, viewIndex} = useApplicationMenu();
</script>
