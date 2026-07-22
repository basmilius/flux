<template>
    <FluxFlowPanel
        v-if="!isStatic"
        :offset="offset"
        :position="position">
        <svg
            :class="$style.flowMinimap"
            :width="width"
            :height="height"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp">
            <rect
                v-for="node of blocks"
                :key="node.id"
                :class="$style.flowMinimapNode"
                :x="node.x"
                :y="node.y"
                :width="node.width"
                :height="node.height"
                rx="2"/>

            <rect
                v-if="frame"
                :class="$style.flowMinimapFrame"
                :x="frame.x"
                :y="frame.y"
                :width="frame.width"
                :height="frame.height"
                rx="2"/>
        </svg>
    </FluxFlowPanel>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import type { FluxFlowPanelPosition, FluxFlowPosition } from '~flux/flow/data';
    import FluxFlowPanel from './FluxFlowPanel.vue';
    import $style from '~flux/flow/css/component/FlowMinimap.module.scss';

    type Block = {
        readonly id: string;
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
    };

    const {
        height = 120,
        offset,
        padding = 9,
        position,
        width = 180
    } = defineProps<{
        readonly height?: number;
        readonly offset?: number;
        readonly padding?: number;
        readonly position?: FluxFlowPanelPosition;
        readonly width?: number;
    }>();

    const controller = useFluxFlowInjection();

    const isStatic = controller.isStatic;

    /**
     * What the map fits: the nodes alone, so panning past them does not shrink
     * every block. One factor for both axes, so the map keeps the proportions
     * of the flow rather than stretching it into its own box.
     */
    const view = computed(() => {
        const bounds = controller.nodeBounds.value;

        if (!bounds) {
            return null;
        }

        const scale = Math.min(
            (width - padding * 2) / Math.max(bounds.maxX - bounds.minX, 1),
            (height - padding * 2) / Math.max(bounds.maxY - bounds.minY, 1)
        );

        return {
            scale,
            // What is left over after the flow is drawn, split evenly, so the
            // map sits centred on the axis that did not decide the scale.
            x: (width - (bounds.maxX - bounds.minX) * scale) / 2 - bounds.minX * scale,
            y: (height - (bounds.maxY - bounds.minY) * scale) / 2 - bounds.minY * scale
        };
    });

    const blocks = computed<Block[]>(() => {
        const value = view.value;

        if (!value) {
            return [];
        }

        return Array.from(controller.nodes.values(), node => {
            const {x, y} = node.position.value;
            const size = node.size.value;

            return {
                id: node.id,
                x: x * value.scale + value.x,
                y: y * value.scale + value.y,
                width: size.width * value.scale,
                height: size.height * value.scale
            };
        });
    });

    /**
     * The slice of the world the viewport shows, drawn on the map. It is allowed
     * to run off the edge: that is what says the flow reaches further than what
     * is on screen.
     */
    const frame = computed(() => {
        const value = view.value;
        const rect = controller.clipElement.value?.getBoundingClientRect();

        if (!value || !rect) {
            return null;
        }

        const {x, y, zoom} = controller.viewport.value;

        return {
            x: (-x / zoom) * value.scale + value.x,
            y: (-y / zoom) * value.scale + value.y,
            width: (rect.width / zoom) * value.scale,
            height: (rect.height / zoom) * value.scale
        };
    });

    function onPointerDown(event: PointerEvent): void {
        (event.currentTarget as Element).setPointerCapture(event.pointerId);
        // The canvas jumps straight to where the map is pressed for as long as the
        // drag lasts, rather than easing towards every point along the way.
        controller.setTracking(true);
        centerOn(event);
    }

    function onPointerMove(event: PointerEvent): void {
        if (event.buttons > 0) {
            centerOn(event);
        }
    }

    function onPointerUp(event: PointerEvent): void {
        (event.currentTarget as Element).releasePointerCapture(event.pointerId);
        controller.setTracking(false);
    }

    /**
     * Moves the viewport so the point pressed on the map ends up in the middle
     * of the canvas.
     */
    function centerOn(event: PointerEvent): void {
        const value = view.value;
        const rect = controller.clipElement.value?.getBoundingClientRect();

        if (!value || !rect) {
            return;
        }

        const {zoom} = controller.viewport.value;
        const point = pointOnMap(event, value);

        controller.setViewport({
            x: rect.width / 2 - point.x * zoom,
            y: rect.height / 2 - point.y * zoom,
            zoom
        });
    }

    function pointOnMap(event: PointerEvent, value: { scale: number; x: number; y: number }): FluxFlowPosition {
        const rect = (event.currentTarget as Element).getBoundingClientRect();

        return {
            x: (event.clientX - rect.left - value.x) / value.scale,
            y: (event.clientY - rect.top - value.y) / value.scale
        };
    }
</script>
