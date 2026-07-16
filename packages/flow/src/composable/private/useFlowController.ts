import { computed, type Ref, shallowReactive, shallowRef } from 'vue';
import type { FluxFlowBounds, FluxFlowController, FluxFlowEdgeRecord, FluxFlowNodeRecord, FluxFlowPosition, FluxFlowViewport } from '~flux/flow/data';

type FlowControllerOptions = {
    readonly isStatic: Readonly<Ref<boolean>>;
    minZoom(): number;
    maxZoom(): number;
    zoomStep(): number;
    fitPadding(): number;
};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

export default function useFlowController(options: FlowControllerOptions): FluxFlowController {
    const nodes = shallowReactive(new Map<string, FluxFlowNodeRecord>());
    const edges = shallowReactive(new Map<number, FluxFlowEdgeRecord>());
    const clipElement = shallowRef<HTMLElement | null>(null);
    const viewport = shallowRef<FluxFlowViewport>({x: 0, y: 0, zoom: 1});

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

    function zoomByStep(direction: 1 | -1): void {
        const rect = getRect();
        const step = options.zoomStep();
        const factor = direction === 1 ? 1 + step : 1 / (1 + step);
        const centerX = (rect?.left ?? 0) + (rect?.width ?? 0) / 2;
        const centerY = (rect?.top ?? 0) + (rect?.height ?? 0) / 2;
        zoomAt(centerX, centerY, factor);
    }

    const bounds = computed<FluxFlowBounds | null>(() => {
        if (nodes.size === 0) {
            return null;
        }

        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (const node of nodes.values()) {
            const {x, y} = node.position.value;
            const {width, height} = node.size.value;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + width);
            maxY = Math.max(maxY, y + height);
        }

        return {minX, minY, maxX, maxY};
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

        // Align the content to the top-left (with padding) rather than centering it.
        viewport.value = {
            x: padding - box.minX * zoom,
            y: padding - box.minY * zoom,
            zoom
        };
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
        isStatic: options.isStatic,
        nodes,
        edges,
        bounds,
        clipElement,
        registerNode: record => void nodes.set(record.id, record),
        unregisterNode: id => void nodes.delete(id),
        getNode: id => nodes.get(id),
        registerEdge: record => void edges.set(record.id, record),
        unregisterEdge: id => void edges.delete(id),
        setClipElement: element => void (clipElement.value = element),
        screenToFlow,
        flowToScreen,
        panBy,
        zoomAt,
        zoomIn: () => zoomByStep(1),
        zoomOut: () => zoomByStep(-1),
        resetZoom: () => fitView(),
        fitView,
        centerView,
        setViewport
    };
}
