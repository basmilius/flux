<template>
    <div
        ref="clip"
        :class="clsx($style.flow, interactive && $style.isInteractive, isPanning && $style.isPanning)"
        :style="flowStyle"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @wheel="onWheel">
        <div
            v-if="background !== 'none'"
            :class="clsx($style.flowBackground, background === 'dots' ? $style.flowBackgroundDots : $style.flowBackgroundGrid)"
            :style="backgroundStyle"/>

        <div
            :class="$style.flowScroll"
            :style="scrollStyle">
            <div
                :class="$style.flowWorld"
                :style="worldStyle">
                <slot/>

                <svg :class="$style.flowEdges">
                    <g
                        v-for="edge of orderedEdges"
                        :key="edge.id"
                        :class="clsx($edge.flowConnectionGroup, edge.id === hoveredEdge && $edge.isHovered)"
                        :style="edge.spec.value?.styleVars">
                        <path
                            v-if="edge.spec.value"
                            :class="$edge.flowConnectionHit"
                            :d="edge.spec.value.path"
                            @pointerenter="hoveredEdge = edge.id"
                            @pointerleave="hoveredEdge = null"/>
                        <path
                            v-if="edge.spec.value"
                            :class="clsx($edge.flowConnectionLine, edge.spec.value.dashed && $edge.isDashed, edge.spec.value.dotted && $edge.isDotted)"
                            :d="edge.spec.value.path"/>
                        <path
                            v-if="edge.spec.value?.hasProgress"
                            :class="$edge.flowConnectionProgress"
                            :d="edge.spec.value.path"
                            pathLength="1"/>
                        <circle
                            v-if="edge.spec.value?.showFrom"
                            :class="clsx($edge.flowConnectionMarker, edge.spec.value.fromActive && $edge.isActive)"
                            :cx="edge.spec.value.fromX"
                            :cy="edge.spec.value.fromY"
                            r="5"/>
                        <circle
                            v-if="edge.spec.value?.showTo"
                            :class="clsx($edge.flowConnectionMarker, edge.spec.value.toActive && $edge.isActive)"
                            :cx="edge.spec.value.toX"
                            :cy="edge.spec.value.toY"
                            r="5"/>
                    </g>
                </svg>

                <div :class="$style.flowEdgeLabels">
                    <template
                        v-for="edge of edgeList"
                        :key="edge.id">
                        <FluxBadge
                            v-if="edge.spec.value && (edge.spec.value.label || edge.spec.value.icon)"
                            :class="$edge.flowConnectionBadge"
                            :style="{left: `${edge.spec.value.labelX}px`, top: `${edge.spec.value.labelY}px`}"
                            :icon="edge.spec.value.icon"
                            :label="edge.spec.value.label ?? ''"/>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge } from '@flux-ui/components';
    import { clsx } from 'clsx';
    import { computed, onMounted, provide, ref, toRef, watch, type CSSProperties } from 'vue';
    import { useFlowController } from '~flux/flow/composable/private';
    import { FluxFlowInjectionKey, type FluxFlowViewport } from '~flux/flow/data';
    import $style from '~flux/flow/css/component/Flow.module.scss';
    import $edge from '~flux/flow/css/component/FlowConnection.module.scss';

    const {
        background = 'none',
        interactive = false,
        start,
        padding = 0,
        minZoom = 0.4,
        maxZoom = 2,
        zoomStep = 0.2,
        gridSize = 24,
        viewport: viewportProp
    } = defineProps<{
        readonly background?: 'dots' | 'grid' | 'none';
        readonly interactive?: boolean;
        readonly start?: string;
        readonly padding?: number;
        readonly minZoom?: number;
        readonly maxZoom?: number;
        readonly zoomStep?: number;
        readonly gridSize?: number;
        readonly viewport?: FluxFlowViewport;
    }>();

    const emit = defineEmits<{
        'update:viewport': [FluxFlowViewport];
    }>();

    defineSlots<{
        default(): any;
    }>();

    // Room reserved above the top row for a card's floating badge, so `padding`
    // can default to 0 without clipping badges.
    const BADGE_ROOM = 42;
    const topPadding = () => Math.max(padding, BADGE_ROOM);

    const controller = useFlowController({
        isStatic: toRef(() => !interactive),
        minZoom: () => minZoom,
        maxZoom: () => maxZoom,
        zoomStep: () => zoomStep,
        fitPadding: () => padding
    });

    provide(FluxFlowInjectionKey, controller);

    const clip = ref<HTMLElement | null>(null);
    const isPanning = ref(false);
    const isReady = ref(false);
    const hoveredEdge = ref<number | null>(null);

    let lastPointer: { x: number; y: number } | null = null;

    // A press that lands on an interactive control inside a card must keep its own
    // click: starting a pan captures the pointer and would swallow it. Opt any other
    // content out of panning with a `data-nopan` attribute.
    const NO_PAN_SELECTOR = 'a, button, input, select, textarea, label, [role="button"], [role="switch"], [contenteditable], [data-nopan]';

    const edgeList = computed(() => Array.from(controller.edges.values()));

    // Render the hovered edge last so it sits above the other lines.
    const orderedEdges = computed(() => {
        if (hoveredEdge.value === null) {
            return edgeList.value;
        }

        return [
            ...edgeList.value.filter(edge => edge.id !== hoveredEdge.value),
            ...edgeList.value.filter(edge => edge.id === hoveredEdge.value)
        ];
    });

    const contentBounds = computed(() => {
        if (controller.nodes.size === 0) {
            return null;
        }

        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (const node of controller.nodes.values()) {
            const {x, y} = node.position.value;
            const {width, height} = node.size.value;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + width);
            maxY = Math.max(maxY, y + height);
        }

        return {minX, minY, width: maxX - minX, height: maxY - minY};
    });

    const flowStyle = computed<CSSProperties | undefined>(() => (interactive ? {height: '100%'} : undefined));

    const scrollStyle = computed<CSSProperties>(() => (interactive
        ? {height: '100%', overflow: 'hidden'}
        // Centre the flow when the container is wider than it, but fall back to
        // the start (scrollable) when it overflows.
        : {display: 'flex', justifyContent: 'safe center', overflowX: 'auto', overflowY: 'hidden'}));

    const worldStyle = computed<CSSProperties>(() => {
        if (interactive) {
            const {x, y, zoom} = controller.viewport.value;
            return {
                transform: `translate(${x}px, ${y}px) scale(${zoom})`,
                // Animate zooming, but never lag behind a live pan or the initial view.
                transition: isReady.value && !isPanning.value ? 'transform 210ms var(--swift-out)' : 'none'
            };
        }

        const bounds = contentBounds.value;

        if (!bounds) {
            return {position: 'relative'};
        }

        // Natural layout: the world sizes to its content (so the flow scrolls when
        // it overflows) and starts at the top-left, offset by the padding. The top
        // keeps room for a card badge.
        const top = topPadding();

        return {
            position: 'relative',
            width: `${Math.ceil(bounds.width + padding * 2)}px`,
            height: `${Math.ceil(bounds.height + padding + top)}px`,
            transform: `translate(${padding - bounds.minX}px, ${top - bounds.minY}px)`
        };
    });

    const backgroundStyle = computed<CSSProperties>(() => ({
        backgroundSize: `${gridSize}px ${gridSize}px`,
        // The backdrop lives outside the scroll: it follows the viewport pan so it
        // stays aligned with the content (centering, zoom-at-point, fitView, …),
        // but never scales with the zoom.
        backgroundPosition: interactive
            ? `${controller.viewport.value.x}px ${controller.viewport.value.y}px`
            : '0 0'
    }));

    const sameViewport = (a: FluxFlowViewport | undefined, b: FluxFlowViewport | undefined): boolean =>
        !!a && !!b && a.x === b.x && a.y === b.y && a.zoom === b.zoom;

    function onPointerDown(event: PointerEvent): void {
        if (!interactive || event.button !== 0) {
            return;
        }

        if (event.target instanceof Element && event.target.closest(NO_PAN_SELECTOR)) {
            return;
        }

        lastPointer = {x: event.clientX, y: event.clientY};
        isPanning.value = true;
        clip.value?.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent): void {
        if (!lastPointer) {
            return;
        }

        const dx = event.clientX - lastPointer.x;
        const dy = event.clientY - lastPointer.y;
        controller.panBy(dx, dy);
        lastPointer = {x: event.clientX, y: event.clientY};
    }

    function onPointerUp(event: PointerEvent): void {
        if (!lastPointer) {
            return;
        }

        lastPointer = null;
        isPanning.value = false;
        clip.value?.releasePointerCapture(event.pointerId);
    }

    function onWheel(event: WheelEvent): void {
        // Only zoom on ctrl/cmd + wheel; a plain wheel keeps scrolling the page.
        if (!interactive || !(event.ctrlKey || event.metaKey)) {
            return;
        }

        event.preventDefault();

        const factor = event.deltaY < 0 ? 1 + zoomStep : 1 / (1 + zoomStep);
        controller.zoomAt(event.clientX, event.clientY, factor);
    }

    watch(() => viewportProp, value => {
        if (value && !sameViewport(value, controller.viewport.value)) {
            controller.setViewport(value);
        }
    }, {deep: true});

    watch(controller.viewport, value => {
        if (!sameViewport(value, viewportProp)) {
            emit('update:viewport', value);
        }
    });

    onMounted(() => {
        controller.setClipElement(clip.value);

        // Natural layout drives its own view through worldStyle; only an interactive
        // viewport needs an initial view.
        if (!interactive) {
            return;
        }

        if (viewportProp) {
            controller.setViewport(viewportProp);
            requestAnimationFrame(() => (isReady.value = true));
            return;
        }

        requestAnimationFrame(() => requestAnimationFrame(() => {
            const startNode = start ? controller.getNode(start) : undefined;
            const rect = clip.value?.getBoundingClientRect();

            if (startNode && rect) {
                // Centre the viewport on the designated start card, at 100% zoom.
                const {x, y} = startNode.position.value;
                const {width, height} = startNode.size.value;
                controller.setViewport({
                    x: rect.width / 2 - (x + width / 2),
                    y: rect.height / 2 - (y + height / 2),
                    zoom: 1
                });
            } else {
                // Start at 100% zoom, aligned to the flow's top-left start point.
                const bounds = contentBounds.value;

                if (bounds) {
                    controller.setViewport({x: padding - bounds.minX, y: topPadding() - bounds.minY, zoom: 1});
                }
            }

            requestAnimationFrame(() => (isReady.value = true));
        }));
    });

    defineExpose({
        controller,
        fitView: (padding?: number) => controller.fitView(padding),
        centerView: (zoom: number) => controller.centerView(zoom),
        zoomIn: () => controller.zoomIn(),
        zoomOut: () => controller.zoomOut(),
        resetZoom: () => controller.resetZoom()
    });
</script>
