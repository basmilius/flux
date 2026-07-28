<template>
    <FluxFlowPanel
        v-if="!isStatic"
        :offset="offset"
        :position="position">
        <FluxButtonStack>
            <!-- The flyout wraps the group rather than the zoom level alone: a
                 wrapper around a single button in the middle would cut the group
                 in two, since its styling runs on first-child, last-child and
                 sibling selectors. -->
            <FluxFlyout :label="zoomLabel ?? translate('flux.flow.zoom')">
                <template #opener="{isOpen, toggle}">
                    <FluxButtonGroup>
                        <FluxSecondaryButton
                            icon-leading="minus"
                            :aria-label="zoomOutLabel ?? translate('flux.flow.zoomOut')"
                            @click="controller.zoomOut"/>

                        <FluxSecondaryButton
                            :class="$style.flowControlsZoom"
                            :label="`${zoomPercentage}%`"
                            aria-haspopup="menu"
                            :aria-expanded="isOpen"
                            @click="toggle"/>

                        <FluxSecondaryButton
                            icon-leading="plus"
                            :aria-label="zoomInLabel ?? translate('flux.flow.zoomIn')"
                            @click="controller.zoomIn"/>
                    </FluxButtonGroup>
                </template>

                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            v-for="preset of presets"
                            :key="preset"
                            is-selectable
                            :is-selected="percentageOf(preset) === zoomPercentage"
                            :label="`${percentageOf(preset)}%`"
                            @click="controller.zoomTo(preset)"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="arrows-to-dot"
                            :label="fitLabel ?? translate('flux.flow.fitView')"
                            @click="fitView"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxFlyout>

            <FluxButtonGroup v-if="isFullscreenAvailable">
                <FluxSecondaryButton
                    :icon-leading="isFullscreen ? 'compress' : 'expand'"
                    :aria-label="fullscreenToggleLabel"
                    @click="toggleFullscreen"/>
            </FluxButtonGroup>
        </FluxButtonStack>
    </FluxFlowPanel>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonGroup, FluxButtonStack, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator } from '@flux-ui/components';
    import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import { type FluxFlowPanelPosition, useFlowTranslate } from '~flux/flow/data';
    import FluxFlowPanel from './FluxFlowPanel.vue';
    import $style from '~flux/flow/css/component/FlowControls.module.scss';

    const {
        exitFullscreenLabel,
        fullscreenLabel
    } = defineProps<{
        readonly offset?: number;
        readonly position?: FluxFlowPanelPosition;
        /**
         * The names the buttons and the zoom flyout carry. Left unset they are
         * translated through `flux.flow.*`.
         */
        readonly exitFullscreenLabel?: string;
        readonly fitLabel?: string;
        readonly fullscreenLabel?: string;
        readonly zoomInLabel?: string;
        readonly zoomLabel?: string;
        readonly zoomOutLabel?: string;
    }>();

    const translate = useFlowTranslate();

    // The levels the flyout offers, from the widest view down. A flow that caps
    // its own zoom keeps only the ones it can actually reach.
    const ZOOM_PRESETS = [2, 1.5, 1, 0.75, 0.5];

    const controller = useFluxFlowInjection();

    // A static flow has nothing to zoom, and a dead row of buttons is worse than
    // no buttons at all.
    const isStatic = controller.isStatic;

    const clip = controller.clipElement;
    const isFullscreen = shallowRef(false);
    const isFullscreenAvailable = shallowRef(false);

    const fullscreenToggleLabel = computed(() => isFullscreen.value
        ? exitFullscreenLabel ?? translate('flux.flow.exitFullscreen')
        : fullscreenLabel ?? translate('flux.flow.fullscreen'));

    const zoomPercentage = computed(() => percentageOf(controller.viewport.value.zoom));
    const presets = computed(() => ZOOM_PRESETS.filter(zoom => zoom >= controller.minZoom.value && zoom <= controller.maxZoom.value));

    onMounted(() => {
        isFullscreenAvailable.value = document.fullscreenEnabled;
        document.addEventListener('fullscreenchange', onFullscreenChange);
    });

    onBeforeUnmount(() => document.removeEventListener('fullscreenchange', onFullscreenChange));

    // fitView takes its padding as an argument, so the click event may not reach it.
    function fitView(): void {
        controller.fitView();
    }

    function percentageOf(zoom: number): number {
        return Math.round(zoom * 100);
    }

    // Against this flow's own element, so a second flow on the page does not
    // light its button up too.
    function onFullscreenChange(): void {
        isFullscreen.value = !!clip.value && document.fullscreenElement === clip.value;
    }

    function toggleFullscreen(): void {
        // The browser may refuse either request; there is nothing to fall back on.
        if (isFullscreen.value) {
            document.exitFullscreen().catch(() => undefined);
            return;
        }

        clip.value?.requestFullscreen().catch(() => undefined);
    }
</script>
