<template>
    <FluxFlowPanel
        v-if="!isStatic"
        :offset="offset"
        :position="position">
        <FluxButtonStack>
            <FluxButtonGroup>
                <FluxSecondaryButton
                    icon-leading="minus"
                    :aria-label="zoomOutLabel"
                    @click="controller.zoomOut"/>

                <FluxSecondaryButton
                    icon-leading="plus"
                    :aria-label="zoomInLabel"
                    @click="controller.zoomIn"/>

                <FluxSecondaryButton
                    icon-leading="arrows-to-dot"
                    :aria-label="fitLabel"
                    @click="fitView"/>
            </FluxButtonGroup>

            <FluxButtonGroup v-if="isFullscreenAvailable">
                <FluxSecondaryButton
                    :icon-leading="isFullscreen ? 'compress' : 'expand'"
                    :aria-label="isFullscreen ? exitFullscreenLabel : fullscreenLabel"
                    @click="toggleFullscreen"/>
            </FluxButtonGroup>
        </FluxButtonStack>
    </FluxFlowPanel>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonGroup, FluxButtonStack, FluxSecondaryButton } from '@flux-ui/components';
    import { onBeforeUnmount, onMounted, shallowRef } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import type { FluxFlowPanelPosition } from '~flux/flow/data';
    import FluxFlowPanel from './FluxFlowPanel.vue';

    const {
        exitFullscreenLabel = 'Exit fullscreen',
        fitLabel = 'Fit view',
        fullscreenLabel = 'Fullscreen',
        offset,
        position,
        zoomInLabel = 'Zoom in',
        zoomOutLabel = 'Zoom out'
    } = defineProps<{
        readonly offset?: number;
        readonly position?: FluxFlowPanelPosition;
        /**
         * The names the icon-only buttons carry. They are the only text the
         * controls hold, so they are props rather than fixed strings.
         */
        readonly exitFullscreenLabel?: string;
        readonly fitLabel?: string;
        readonly fullscreenLabel?: string;
        readonly zoomInLabel?: string;
        readonly zoomOutLabel?: string;
    }>();

    const controller = useFluxFlowInjection();

    // A static flow has nothing to zoom, and a dead row of buttons is worse than
    // no buttons at all.
    const isStatic = controller.isStatic;

    const clip = controller.clipElement;
    const isFullscreen = shallowRef(false);
    const isFullscreenAvailable = shallowRef(false);

    onMounted(() => {
        isFullscreenAvailable.value = document.fullscreenEnabled;
        document.addEventListener('fullscreenchange', onFullscreenChange);
    });

    onBeforeUnmount(() => document.removeEventListener('fullscreenchange', onFullscreenChange));

    // fitView takes its padding as an argument, so the click event may not reach it.
    function fitView(): void {
        controller.fitView();
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
