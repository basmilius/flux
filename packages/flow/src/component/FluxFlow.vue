<template>
    <div
        ref="clip"
        :class="clsx($style.flow, interactive && $style.isInteractive, isPanning && $style.isPanning)"
        :style="flowStyle"
        :tabindex="interactive ? 0 : undefined"
        @keydown="onKeyDown"
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
                <!-- Sits beneath the nodes, so it captures hover for the edge
                     highlight without ever shadowing interactive card content. -->
                <svg :class="$style.flowEdgesHit">
                    <path
                        v-for="edge of hitEdges"
                        :key="edge.id"
                        :class="$edge.flowConnectionHit"
                        :d="edge.spec.path"
                        @pointerenter="hoveredEdge = edge.id"
                        @pointerleave="hoveredEdge = null"/>
                </svg>

                <!-- The layer a FluxFlowGroup and a FluxFlowLane draw in, so a
                     backdrop written between the nodes still renders behind them. -->
                <div
                    ref="backdrop"
                    :class="$style.flowBackdrop"/>

                <slot/>

                <svg :class="clsx($style.flowEdges, resolvedEdgeLayer === 'under' && $style.isUnder)">
                    <defs>
                        <!-- Cuts every label out of every connector, so a line ends
                             flush against a badge instead of running behind it,
                             whether the badge is its own or a crossing one's.

                             The region is spelled out rather than left to default:
                             a mask defaults to 120% of the element's bounding box,
                             which under userSpaceOnUse resolves against the SVG
                             viewport an interactive flow pans its world out from. -->
                        <mask
                            v-if="labelBoxes.size > 0"
                            :id="`${uid}-labels`"
                            maskUnits="userSpaceOnUse"
                            x="-99999"
                            y="-99999"
                            width="199998"
                            height="199998">
                            <rect
                                x="-99999"
                                y="-99999"
                                width="199998"
                                height="199998"
                                fill="#fff"/>
                            <rect
                                v-for="[id, label] of labelBoxes"
                                :key="id"
                                :x="label.x"
                                :y="label.y"
                                :width="label.width"
                                :height="label.height"
                                :rx="label.height / 2"
                                fill="#000"/>
                        </mask>
                    </defs>

                    <g
                        v-for="edge of drawnEdges"
                        :key="edge.id"
                        :class="clsx($edge.flowConnectionGroup, edge.id === hoveredEdge && $edge.isHovered, !edge.spec.isColored && $edge.isNeutral)"
                        :style="edge.spec.styleVars"
                        :mask="labelBoxes.size > 0 ? `url(#${uid}-labels)` : undefined">
                        <path
                            :class="clsx($edge.flowConnectionLine, edge.spec.animated && $edge.isAnimated, edge.spec.dashed && $edge.isDashed, edge.spec.dotted && $edge.isDotted)"
                            :d="edge.spec.path"/>
                        <path
                            v-if="edge.spec.hasProgress"
                            :class="$edge.flowConnectionProgress"
                            :d="edge.spec.path"
                            pathLength="1"/>
                        <path
                            v-if="edge.spec.fromMarkerPath"
                            :class="clsx(MARKER_CLASSES[edge.spec.fromMarkerFill], edge.spec.fromActive && $edge.isActive)"
                            :d="edge.spec.fromMarkerPath"/>
                        <path
                            v-if="edge.spec.toMarkerPath"
                            :class="clsx(MARKER_CLASSES[edge.spec.toMarkerFill], edge.spec.toActive && $edge.isActive)"
                            :d="edge.spec.toMarkerPath"/>
                    </g>
                </svg>

                <!-- The layer a FluxFlowGroup teleports its title into, above the
                     connectors, so a line drawn through the group never paints
                     over the label. -->
                <div
                    ref="foreground"
                    :class="$style.flowForeground"/>

                <div :class="$style.flowEdgeLabels">
                    <FluxBadge
                        v-for="edge of labelledEdges"
                        :key="edge.id"
                        :ref="element => setLabelElement(edge.id, element)"
                        :class="clsx($edge.flowConnectionBadge, !edge.spec.label && $edge.isBare)"
                        :style="{...edge.spec.styleVars, left: `${edge.spec.labelX}px`, top: `${edge.spec.labelY}px`}"
                        :icon="edge.spec.icon"
                        :label="edge.spec.label ?? ''"/>
                </div>
            </div>
        </div>

        <!-- The layer a FluxFlowPanel draws in: above the world, but outside it,
             so what it holds stays put while the flow pans and zooms below. -->
        <div
            ref="overlay"
            :class="$style.flowOverlay"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge } from '@flux-ui/components';
    import { clsx } from 'clsx';
    import { computed, type CSSProperties, inject, onBeforeUnmount, onMounted, provide, ref, toRef, useId, useTemplateRef, watch } from 'vue';
    import { useFlowController, useFlowGestures, useFlowKeyboard, useFlowLabels } from '~flux/flow/composable/private';
    import { type FluxFlowDirection, FluxFlowEdgeLayerInjectionKey, type FluxFlowEdgeRecord, type FluxFlowEdgeSpec, FluxFlowInjectionKey, type FluxFlowMarkerFill, type FluxFlowViewport } from '~flux/flow/data';
    import $style from '~flux/flow/css/component/Flow.module.scss';
    import $edge from '~flux/flow/css/component/FlowConnection.module.scss';

    type DrawnEdge = {
        readonly id: number;
        readonly spec: FluxFlowEdgeSpec;
    };

    const viewport = defineModel<FluxFlowViewport>('viewport');

    const {
        align = 'center',
        axis,
        background = 'none',
        interactive = false,
        start,
        padding = 0,
        minZoom = 0.4,
        maxZoom = 2,
        zoomStep = 0.2,
        gridSize = 24
    } = defineProps<{
        readonly align?: 'start' | 'center';
        /**
         * The axis connectors leave and enter their nodes on. Without one every
         * connector picks the shorter of the two, which is the wrong one as soon
         * as a row of nodes is wider than the gap between two rows.
         */
        readonly axis?: FluxFlowDirection;
        readonly background?: 'dots' | 'grid' | 'none';
        readonly interactive?: boolean;
        readonly start?: string;
        readonly padding?: number;
        readonly minZoom?: number;
        readonly maxZoom?: number;
        readonly zoomStep?: number;
        readonly gridSize?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const MARKER_CLASSES: Record<FluxFlowMarkerFill, string> = {
        outline: $edge.flowConnectionMarkerOutline,
        solid: $edge.flowConnectionMarkerSolid,
        stroke: $edge.flowConnectionMarkerStroke
    };

    const uid = useId();
    const clip = useTemplateRef<HTMLElement>('clip');
    const backdrop = useTemplateRef<HTMLElement>('backdrop');
    const foreground = useTemplateRef<HTMLElement>('foreground');
    const overlay = useTemplateRef<HTMLElement>('overlay');
    const isReady = ref(false);
    const hoveredEdge = ref<number | null>(null);

    let initialFrame = 0;

    const controller = useFlowController({
        axis: toRef(() => axis),
        isStatic: toRef(() => !interactive),
        minZoom: () => minZoom,
        maxZoom: () => maxZoom,
        zoomStep: () => zoomStep,
        fitPadding: () => padding
    });

    provide(FluxFlowInjectionKey, controller);

    // Connectors draw under the cards. An enclosing element (the docs playground)
    // can flip that for the flows inside it by providing the edge-layer key.
    const parentEdgeLayer = inject(FluxFlowEdgeLayerInjectionKey, null);
    const resolvedEdgeLayer = computed(() => parentEdgeLayer?.value ?? 'under');

    provide(FluxFlowEdgeLayerInjectionKey, resolvedEdgeLayer);

    const {isPanning, onPointerDown, onPointerMove, onPointerUp, onWheel} = useFlowGestures({
        clip,
        controller,
        isInteractive: () => interactive,
        zoomStep: () => zoomStep
    });

    const {onKeyDown} = useFlowKeyboard({
        controller,
        isInteractive: () => interactive
    });

    const edgeList = computed(() => Array.from(controller.edges.values()));

    const {boxes: labelBoxes, setElement: setLabelElement} = useFlowLabels(() => edgeList.value);

    // SVG has no z-index, so paint order is stacking order: plain gray lines
    // first, colored ones over them, and the hovered edge last of all. A stable
    // sort keeps each band in registration order.
    const orderedEdges = computed(() => {
        const rank = (edge: FluxFlowEdgeRecord): number => {
            if (edge.id === hoveredEdge.value) {
                return 2;
            }

            return edge.spec.value?.isColored ? 1 : 0;
        };

        return [...edgeList.value].sort((first, second) => rank(first) - rank(second));
    });

    const hitEdges = computed(() => drawable(edgeList.value));
    const drawnEdges = computed(() => drawable(orderedEdges.value));
    const labelledEdges = computed(() => hitEdges.value.filter(edge => edge.spec.label || edge.spec.icon));

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
                // Animate a stepped zoom, but never lag behind a viewport that is
                // being steered by hand, or behind the initial view.
                transition: isReady.value && !controller.isTracking.value ? 'transform 210ms var(--swift-out)' : 'none'
            };
        }

        const bounds = controller.bounds.value;

        if (!bounds) {
            return {position: 'relative'};
        }

        // Natural layout: the world sizes to its content (so the flow scrolls when
        // it overflows) and starts at the top-left, offset by the padding.
        return {
            position: 'relative',
            width: `${Math.ceil(bounds.maxX - bounds.minX + padding * 2)}px`,
            height: `${Math.ceil(bounds.maxY - bounds.minY + padding * 2)}px`,
            transform: `translate(${padding - bounds.minX}px, ${padding - bounds.minY}px)`
        };
    });

    const backgroundStyle = computed<CSSProperties>(() => ({
        backgroundSize: `${gridSize}px ${gridSize}px`,
        // The backdrop follows the viewport pan so it stays aligned with the
        // content, but never scales with the zoom.
        backgroundPosition: interactive
            ? `${controller.viewport.value.x}px ${controller.viewport.value.y}px`
            : '0 0'
    }));

    watch(viewport, value => {
        if (value && !sameViewport(value, controller.viewport.value)) {
            controller.setViewport(value);
        }
    }, {deep: true});

    watch(controller.viewport, value => {
        if (!sameViewport(value, viewport.value)) {
            viewport.value = value;
        }
    });

    onMounted(() => {
        controller.setClipElement(clip.value);
        controller.setBackdropElement(backdrop.value);
        controller.setForegroundElement(foreground.value);
        controller.setOverlayElement(overlay.value);

        // Natural layout drives its own view through worldStyle; only an interactive
        // viewport needs an initial view.
        if (!interactive) {
            return;
        }

        if (viewport.value) {
            controller.setViewport(viewport.value);
            initialFrame = requestAnimationFrame(() => (isReady.value = true));
            return;
        }

        initialFrame = requestAnimationFrame(() => (initialFrame = requestAnimationFrame(() => {
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
                // Start at 100% zoom, at the top of the flow: centred horizontally
                // when there is room to spare, against its left edge when not.
                const bounds = controller.bounds.value;

                if (bounds) {
                    const spare = rect ? rect.width - (bounds.maxX - bounds.minX) : 0;

                    controller.setViewport({
                        x: (align === 'center' ? Math.max(spare / 2, padding) : padding) - bounds.minX,
                        y: padding - bounds.minY,
                        zoom: 1
                    });
                }
            }

            initialFrame = requestAnimationFrame(() => (isReady.value = true));
        })));
    });

    onBeforeUnmount(() => cancelAnimationFrame(initialFrame));

    // Only an edge that has resolved its geometry can be drawn: a connector
    // naming a node that does not exist publishes no spec.
    function drawable(edges: readonly FluxFlowEdgeRecord[]): DrawnEdge[] {
        return edges.flatMap(edge => (edge.spec.value ? [{id: edge.id, spec: edge.spec.value}] : []));
    }

    function sameViewport(a: FluxFlowViewport | undefined, b: FluxFlowViewport | undefined): boolean {
        if (a === b) {
            return true;
        }

        return !!a && !!b && a.x === b.x && a.y === b.y && a.zoom === b.zoom;
    }

    defineExpose({
        controller,
        fitView: controller.fitView,
        centerView: controller.centerView,
        zoomIn: controller.zoomIn,
        zoomOut: controller.zoomOut,
        zoomTo: controller.zoomTo,
        resetZoom: controller.resetZoom
    });
</script>
