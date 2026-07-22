import { computed, type ComputedRef, type Ref, shallowReactive, shallowRef } from 'vue';
import type { FluxFlowBounds, FluxFlowBoxRecord, FluxFlowController, FluxFlowDirection, FluxFlowEdgeRecord, FluxFlowNodeRecord, FluxFlowPosition, FluxFlowViewport } from '~flux/flow/data';
import { boundsOfNodes, clamp } from '~flux/flow/util';

type FlowControllerOptions = {
    readonly axis: Readonly<Ref<FluxFlowDirection | undefined>>;
    readonly isStatic: Readonly<Ref<boolean>>;
    minZoom(): number;
    maxZoom(): number;
    zoomStep(): number;
    fitPadding(): number;
};

// Slack past the viewport edge, so resting against it reads as an edge rather
// than a snag and a flow smaller than its viewport can still be moved.
const PAN_OVERSCROLL = 300;

const sameBounds = (a: FluxFlowBounds | null, b: FluxFlowBounds | null): boolean => a === b
    || (!!a && !!b && a.minX === b.minX && a.minY === b.minY && a.maxX === b.maxX && a.maxY === b.maxY);

/**
 * Hands the previous box back when nothing moved, so a box that is rebuilt on
 * every render does not measure and render forever.
 */
function stableBounds(measure: () => FluxFlowBounds | null): ComputedRef<FluxFlowBounds | null> {
    let previous: FluxFlowBounds | null = null;

    return computed(() => {
        const next = measure();
        previous = sameBounds(previous, next) ? previous : next;

        return previous;
    });
}

export default function useFlowController(options: FlowControllerOptions): FluxFlowController {
    const nodes = shallowReactive(new Map<string, FluxFlowNodeRecord>());
    const edges = shallowReactive(new Map<number, FluxFlowEdgeRecord>());
    const boxes = shallowReactive(new Map<number, FluxFlowBoxRecord>());
    const clipElement = shallowRef<HTMLElement | null>(null);
    const backdropElement = shallowRef<HTMLElement | null>(null);
    const overlayElement = shallowRef<HTMLElement | null>(null);
    const viewport = shallowRef<FluxFlowViewport>({x: 0, y: 0, zoom: 1});
    const isTracking = shallowRef(false);

    function getRect(): DOMRect | null {
        return clipElement.value?.getBoundingClientRect() ?? null;
    }

    function setViewport(next: FluxFlowViewport): void {
        viewport.value = {
            x: next.x,
            y: next.y,
            zoom: clamp(next.zoom, options.minZoom(), options.maxZoom())
        };
    }

    function screenToFlow(clientX: number, clientY: number): FluxFlowPosition {
        const rect = getRect();
        const {x, y, zoom} = viewport.value;

        return {
            x: ((clientX - (rect?.left ?? 0)) - x) / zoom,
            y: ((clientY - (rect?.top ?? 0)) - y) / zoom
        };
    }

    function flowToScreen(x: number, y: number): FluxFlowPosition {
        const rect = getRect();
        const view = viewport.value;

        return {
            x: x * view.zoom + view.x + (rect?.left ?? 0),
            y: y * view.zoom + view.y + (rect?.top ?? 0)
        };
    }

    function panBy(dx: number, dy: number): void {
        const {x, y, zoom} = viewport.value;
        viewport.value = {x: x + dx, y: y + dy, zoom};
    }

    /**
     * Pans, but never so far that the world leaves the viewport behind, and
     * reports how far it actually moved. A wheel gesture uses that to hand the
     * scroll back to the page once the flow sits against its own edge.
     */
    function panBounded(dx: number, dy: number): FluxFlowPosition {
        const rect = getRect();
        const box = bounds.value;

        if (!rect || !box) {
            return {x: 0, y: 0};
        }

        const view = viewport.value;

        const axis = (offset: number, delta: number, min: number, max: number, extent: number): number => {
            // The two positions where the world rests flush against the viewport;
            // whichever way round they sit, the room between them plus the
            // overscroll on either side is where the world may go.
            const start = -min * view.zoom;
            const end = extent - max * view.zoom;

            return clamp(
                offset + delta,
                Math.min(start, end) - PAN_OVERSCROLL,
                Math.max(start, end) + PAN_OVERSCROLL
            );
        };

        const x = axis(view.x, dx, box.minX, box.maxX, rect.width);
        const y = axis(view.y, dy, box.minY, box.maxY, rect.height);

        if (x === view.x && y === view.y) {
            return {x: 0, y: 0};
        }

        viewport.value = {x, y, zoom: view.zoom};

        return {x: x - view.x, y: y - view.y};
    }

    function zoomAt(clientX: number, clientY: number, factor: number): void {
        const rect = getRect();
        const view = viewport.value;
        const zoom = clamp(view.zoom * factor, options.minZoom(), options.maxZoom());

        if (zoom === view.zoom) {
            return;
        }

        const px = clientX - (rect?.left ?? 0);
        const py = clientY - (rect?.top ?? 0);
        const flowX = (px - view.x) / view.zoom;
        const flowY = (py - view.y) / view.zoom;

        viewport.value = {
            x: px - flowX * zoom,
            y: py - flowY * zoom,
            zoom
        };
    }

    function zoomAtCenter(factor: number): void {
        const rect = getRect();
        const centerX = (rect?.left ?? 0) + (rect?.width ?? 0) / 2;
        const centerY = (rect?.top ?? 0) + (rect?.height ?? 0) / 2;
        zoomAt(centerX, centerY, factor);
    }

    function zoomByStep(direction: 1 | -1): void {
        const step = options.zoomStep();
        zoomAtCenter(direction === 1 ? 1 + step : 1 / (1 + step));
    }

    const nodeBounds = stableBounds(() => boundsOfNodes(nodes.values()));

    const bounds = stableBounds(() => {
        let {minX, minY, maxX, maxY} = nodeBounds.value ?? {minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity};

        // A routed connector may swing wide of every node, so its waypoints
        // stretch the world too instead of being clipped off it.
        for (const edge of edges.values()) {
            for (const {x, y} of edge.spec.value?.waypoints ?? []) {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }

        // The same for a group frame or a lane band: it is drawn behind the
        // nodes, but it still belongs to the world.
        for (const box of boxes.values()) {
            const value = box.bounds.value;

            if (value) {
                minX = Math.min(minX, value.minX);
                minY = Math.min(minY, value.minY);
                maxX = Math.max(maxX, value.maxX);
                maxY = Math.max(maxY, value.maxY);
            }
        }

        return Number.isFinite(minX) ? {minX, minY, maxX, maxY} : null;
    });

    function centerBounds(rect: DOMRect, box: FluxFlowBounds, zoom: number): void {
        const centerX = box.minX + (box.maxX - box.minX) / 2;
        const centerY = box.minY + (box.maxY - box.minY) / 2;

        viewport.value = {
            x: rect.width / 2 - centerX * zoom,
            y: rect.height / 2 - centerY * zoom,
            zoom
        };
    }

    function fitView(padding: number = options.fitPadding()): void {
        const rect = getRect();
        const box = bounds.value;

        if (!rect || !box) {
            viewport.value = {x: 0, y: 0, zoom: 1};
            return;
        }

        const boundsWidth = Math.max(box.maxX - box.minX, 1);
        const boundsHeight = Math.max(box.maxY - box.minY, 1);
        const availableWidth = Math.max(rect.width - padding * 2, 1);
        const availableHeight = Math.max(rect.height - padding * 2, 1);

        const zoom = clamp(
            Math.min(availableWidth / boundsWidth, availableHeight / boundsHeight, 1),
            options.minZoom(),
            options.maxZoom()
        );

        // The padding has done its work in the zoom above; what is left over is
        // shared evenly, so the flow sits in the middle of its viewport.
        centerBounds(rect, box, zoom);
    }

    function centerView(zoom: number): void {
        const rect = getRect();
        const box = bounds.value;
        const clamped = clamp(zoom, options.minZoom(), options.maxZoom());

        if (!rect || !box) {
            viewport.value = {x: 0, y: 0, zoom: clamped};
            return;
        }

        centerBounds(rect, box, clamped);
    }

    return {
        viewport,
        axis: options.axis,
        isStatic: options.isStatic,
        minZoom: computed(() => options.minZoom()),
        maxZoom: computed(() => options.maxZoom()),
        isTracking,
        nodes,
        edges,
        boxes,
        bounds,
        nodeBounds,
        clipElement,
        backdropElement,
        overlayElement,
        registerNode: record => void nodes.set(record.id, record),
        unregisterNode: id => void nodes.delete(id),
        getNode: id => nodes.get(id),
        registerEdge: record => void edges.set(record.id, record),
        unregisterEdge: id => void edges.delete(id),
        registerBox: record => void boxes.set(record.id, record),
        unregisterBox: id => void boxes.delete(id),
        setClipElement: element => void (clipElement.value = element),
        setBackdropElement: element => void (backdropElement.value = element),
        setOverlayElement: element => void (overlayElement.value = element),
        setTracking: value => void (isTracking.value = value),
        screenToFlow,
        flowToScreen,
        panBy,
        panBounded,
        zoomAt,
        zoomIn: () => zoomByStep(1),
        zoomOut: () => zoomByStep(-1),
        zoomTo: zoom => zoomAtCenter(zoom / viewport.value.zoom),
        resetZoom: () => fitView(),
        fitView,
        centerView,
        setViewport
    };
}
