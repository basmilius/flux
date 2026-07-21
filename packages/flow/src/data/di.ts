import type { FluxIconName } from '@flux-ui/types';
import type { InjectionKey, Ref, ShallowReactive } from 'vue';

export type FluxFlowPosition = {
    readonly x: number;
    readonly y: number;
};

export type FluxFlowSize = {
    readonly width: number;
    readonly height: number;
};

export type FluxFlowViewport = {
    readonly x: number;
    readonly y: number;
    readonly zoom: number;
};

export type FluxFlowBounds = {
    readonly minX: number;
    readonly minY: number;
    readonly maxX: number;
    readonly maxY: number;
};

export type FluxFlowSide = 'top' | 'right' | 'bottom' | 'left';

/**
 * Where along a side a connector attaches. `start` and `end` are meant in
 * reading direction: left and right on a horizontal side, top and bottom on a
 * vertical one.
 */
export type FluxFlowAlign = 'start' | 'center' | 'end';

export type FluxFlowConnectionType = 'bezier' | 'smoothstep' | 'straight';

export type FluxFlowNodeRecord = {
    readonly id: string;
    readonly position: Readonly<Ref<FluxFlowPosition>>;
    readonly size: Readonly<Ref<FluxFlowSize>>;
    readonly element: Readonly<Ref<HTMLElement | null>>;
    /**
     * The centre of the node's `[data-flow-anchor]` element, relative to its own
     * top-left, or `null` when it has none. A `start` connector lands on it, so
     * a card and a pill each anchor on their own icon rather than on a shared
     * guess at where an icon sits.
     */
    readonly anchor: Readonly<Ref<FluxFlowPosition | null>>;
};

export type FluxFlowMarker = 'arrow' | 'bar' | 'chevron' | 'diamond' | 'dot' | 'square' | 'none';

/**
 * How a marker is painted. `outline` shapes read as ports: a hole in the
 * surface with a colored rim. `solid` shapes are filled arrow heads. `stroke`
 * shapes are open lines that continue the connector.
 */
export type FluxFlowMarkerFill = 'outline' | 'solid' | 'stroke';

export type FluxFlowEdgeSpec = {
    readonly path: string;
    readonly labelX: number;
    readonly labelY: number;
    readonly fromX: number;
    readonly fromY: number;
    readonly toX: number;
    readonly toY: number;
    readonly styleVars: Record<string, string>;
    readonly animated: boolean;
    readonly dashed: boolean;
    readonly dotted: boolean;
    readonly fromMarkerPath: string;
    readonly fromMarkerFill: FluxFlowMarkerFill;
    readonly toMarkerPath: string;
    readonly toMarkerFill: FluxFlowMarkerFill;
    readonly fromActive: boolean;
    readonly toActive: boolean;
    readonly hasProgress: boolean;
    readonly label?: string;
    readonly icon?: FluxIconName;
};

export type FluxFlowEdgeRecord = {
    readonly id: number;
    readonly spec: Readonly<Ref<FluxFlowEdgeSpec | null>>;
};

export type FluxFlowController = {
    readonly viewport: Ref<FluxFlowViewport>;
    readonly isStatic: Readonly<Ref<boolean>>;
    readonly nodes: ShallowReactive<Map<string, FluxFlowNodeRecord>>;
    readonly edges: ShallowReactive<Map<number, FluxFlowEdgeRecord>>;
    readonly bounds: Readonly<Ref<FluxFlowBounds | null>>;
    readonly clipElement: Readonly<Ref<HTMLElement | null>>;
    registerNode(record: FluxFlowNodeRecord): void;
    unregisterNode(id: string): void;
    getNode(id: string): FluxFlowNodeRecord | undefined;
    registerEdge(record: FluxFlowEdgeRecord): void;
    unregisterEdge(id: number): void;
    setClipElement(element: HTMLElement | null): void;
    screenToFlow(clientX: number, clientY: number): FluxFlowPosition;
    flowToScreen(x: number, y: number): FluxFlowPosition;
    panBy(dx: number, dy: number): void;
    zoomAt(clientX: number, clientY: number, factor: number): void;
    zoomIn(): void;
    zoomOut(): void;
    resetZoom(): void;
    fitView(padding?: number): void;
    centerView(zoom: number): void;
    setViewport(viewport: FluxFlowViewport): void;
};

export const FluxFlowInjectionKey: InjectionKey<FluxFlowController> = Symbol('flux.flow');
