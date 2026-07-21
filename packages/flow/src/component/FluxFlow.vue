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
                <!-- Transparent hit layer beneath the nodes: it captures hover for the
                     edge highlight, but never shadows the interactive card content that
                     sits above it, so a press on a control is never stolen for a pan. -->
                <svg :class="$style.flowEdgesHit">
                    <template
                        v-for="edge of edgeList"
                        :key="edge.id">
                        <path
                            v-if="edge.spec.value"
                            :class="$edge.flowConnectionHit"
                            :d="edge.spec.value.path"
                            @pointerenter="hoveredEdge = edge.id"
                            @pointerleave="hoveredEdge = null"/>
                    </template>
                </svg>

                <slot/>

                <svg :class="$style.flowEdges">
                    <defs>
                        <!-- Cuts the label out of its own connector, so the line ends
                             flush against the badge instead of running behind it. -->
                        <mask
                            v-for="[id, label] of labelBoxes"
                            :key="id"
                            :id="`${uid}-${id}`"
                            maskUnits="userSpaceOnUse">
                            <rect
                                x="-99999"
                                y="-99999"
                                width="199998"
                                height="199998"
                                fill="#fff"/>
                            <rect
                                :x="label.x"
                                :y="label.y"
                                :width="label.width"
                                :height="label.height"
                                :rx="label.height / 2"
                                fill="#000"/>
                        </mask>
                    </defs>

                    <g
                        v-for="edge of orderedEdges"
                        :key="edge.id"
                        :class="clsx($edge.flowConnectionGroup, edge.id === hoveredEdge && $edge.isHovered)"
                        :style="edge.spec.value?.styleVars"
                        :mask="labelBoxes.has(edge.id) ? `url(#${uid}-${edge.id})` : undefined">
                        <path
                            v-if="edge.spec.value"
                            :class="clsx($edge.flowConnectionLine, edge.spec.value.animated && $edge.isAnimated, edge.spec.value.dashed && $edge.isDashed, edge.spec.value.dotted && $edge.isDotted)"
                            :d="edge.spec.value.path"/>
                        <path
                            v-if="edge.spec.value?.hasProgress"
                            :class="$edge.flowConnectionProgress"
                            :d="edge.spec.value.path"
                            pathLength="1"/>
                        <path
                            v-if="edge.spec.value?.fromMarkerPath"
                            :class="clsx($edge[markerClass(edge.spec.value.fromMarkerFill)], edge.spec.value.fromActive && $edge.isActive)"
                            :d="edge.spec.value.fromMarkerPath"/>
                        <path
                            v-if="edge.spec.value?.toMarkerPath"
                            :class="clsx($edge[markerClass(edge.spec.value.toMarkerFill)], edge.spec.value.toActive && $edge.isActive)"
                            :d="edge.spec.value.toMarkerPath"/>
                    </g>
                </svg>

                <div :class="$style.flowEdgeLabels">
                    <template
                        v-for="edge of edgeList"
                        :key="edge.id">
                        <FluxBadge
                            v-if="edge.spec.value && (edge.spec.value.label || edge.spec.value.icon)"
                            :ref="element => setLabelElement(edge.id, element)"
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
    import { type ComponentPublicInstance, computed, type CSSProperties, onBeforeUnmount, onMounted, provide, ref, shallowRef, toRef, useId, useTemplateRef, watch } from 'vue';
    import { useFlowController } from '~flux/flow/composable/private';
    import { FluxFlowInjectionKey, type FluxFlowMarkerFill, type FluxFlowPosition, type FluxFlowSize, type FluxFlowViewport } from '~flux/flow/data';
    import $style from '~flux/flow/css/component/Flow.module.scss';
    import $edge from '~flux/flow/css/component/FlowConnection.module.scss';

    const viewport = defineModel<FluxFlowViewport>('viewport');

    const {
        background = 'none',
        interactive = false,
        start,
        padding = 0,
        minZoom = 0.4,
        maxZoom = 2,
        zoomStep = 0.2,
        gridSize = 24
    } = defineProps<{
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

    // Air between a connector label and the two line ends it separates.
    const LABEL_GAP = 6;

    // A press that lands on an interactive control inside a card must keep its own
    // click: starting a pan captures the pointer and would swallow it. Opt any other
    // content out of panning with a `data-nopan` attribute.
    const NO_PAN_SELECTOR = 'a, button, input, select, textarea, label, [role="button"], [role="switch"], [contenteditable], [data-nopan]';

    const uid = useId();
    const clip = useTemplateRef<HTMLElement>('clip');
    const isPanning = ref(false);
    const isReady = ref(false);
    const hoveredEdge = ref<number | null>(null);
    const labelSizes = shallowRef(new Map<number, FluxFlowSize>());

    const labelElements = new Map<number, HTMLElement>();

    let lastPointer: { x: number; y: number } | null = null;
    let labelObserver: ResizeObserver | null = null;
    let initialFrame = 0;

    const controller = useFlowController({
        isStatic: toRef(() => !interactive),
        minZoom: () => minZoom,
        maxZoom: () => maxZoom,
        zoomStep: () => zoomStep,
        fitPadding: () => padding
    });

    provide(FluxFlowInjectionKey, controller);

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

    // The hole each label punches in its own connector: its own box, widened so
    // the line visibly breaks around it instead of ending under its edge.
    const labelBoxes = computed(() => {
        const boxes = new Map<number, FluxFlowSize & FluxFlowPosition>();

        for (const edge of edgeList.value) {
            const spec = edge.spec.value;
            const size = labelSizes.value.get(edge.id);

            if (spec && size) {
                boxes.set(edge.id, {
                    x: spec.labelX - size.width / 2 - LABEL_GAP,
                    y: spec.labelY - size.height / 2 - LABEL_GAP,
                    width: size.width + LABEL_GAP * 2,
                    height: size.height + LABEL_GAP * 2
                });
            }
        }

        return boxes;
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
        // The backdrop lives outside the scroll: it follows the viewport pan so it
        // stays aligned with the content (centering, zoom-at-point, fitView, …),
        // but never scales with the zoom.
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
        labelObserver = new ResizeObserver(measureLabels);

        for (const element of labelElements.values()) {
            labelObserver.observe(element);
        }

        measureLabels();

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
                // Start at 100% zoom, aligned to the flow's top-left start point.
                const bounds = controller.bounds.value;

                if (bounds) {
                    controller.setViewport({x: padding - bounds.minX, y: padding - bounds.minY, zoom: 1});
                }
            }

            initialFrame = requestAnimationFrame(() => (isReady.value = true));
        })));
    });

    onBeforeUnmount(() => {
        cancelAnimationFrame(initialFrame);
        labelObserver?.disconnect();
        labelObserver = null;
    });

    function markerClass(fill: FluxFlowMarkerFill): 'flowConnectionMarkerOutline' | 'flowConnectionMarkerSolid' | 'flowConnectionMarkerStroke' {
        switch (fill) {
            case 'outline':
                return 'flowConnectionMarkerOutline';
            case 'solid':
                return 'flowConnectionMarkerSolid';
            case 'stroke':
                return 'flowConnectionMarkerStroke';
        }
    }

    function setLabelElement(id: number, instance: Element | ComponentPublicInstance | null): void {
        const element = (instance as ComponentPublicInstance | null)?.$el as HTMLElement | undefined;
        const previous = labelElements.get(id);

        if (previous === element) {
            return;
        }

        if (previous) {
            labelObserver?.unobserve(previous);
        }

        if (element) {
            labelElements.set(id, element);
            labelObserver?.observe(element);
        } else {
            labelElements.delete(id);
        }

        measureLabels();
    }

    function measureLabels(): void {
        const sizes = new Map<number, FluxFlowSize>();

        for (const [id, element] of labelElements) {
            sizes.set(id, {width: element.offsetWidth, height: element.offsetHeight});
        }

        labelSizes.value = sizes;
    }

    function sameViewport(a: FluxFlowViewport | undefined, b: FluxFlowViewport | undefined): boolean {
        if (a === b) {
            return true;
        }

        return !!a && !!b && a.x === b.x && a.y === b.y && a.zoom === b.zoom;
    }

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

    defineExpose({
        controller,
        fitView: (padding?: number) => controller.fitView(padding),
        centerView: (zoom: number) => controller.centerView(zoom),
        zoomIn: () => controller.zoomIn(),
        zoomOut: () => controller.zoomOut(),
        resetZoom: () => controller.resetZoom()
    });
</script>
